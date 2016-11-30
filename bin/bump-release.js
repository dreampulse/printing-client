#!/usr/bin/env node

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const minimist = require('minimist')
const semver = require('semver')

const defaultVerifyScript = ':'
const argv = minimist(process.argv, {
  string: ['verify-script'],
  default: {
    'verify-script': defaultVerifyScript
  }
})
const fileExists = fs.existsSync || fs.accessSync
const exec = childProcess.exec
const toVersion = argv._.pop()
const npmPackageDirectory = argv._.pop()

const cdPath = path.resolve(process.cwd(), npmPackageDirectory)
const packageJsonPath = path.resolve(process.cwd(), npmPackageDirectory, 'package.json')
const changelogPath = path.resolve(process.cwd(), npmPackageDirectory, 'CHANGELOG.md')
const formattedDate = new Date().toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '')

if (!toVersion || !fileExists(packageJsonPath) || argv.help) {
  console.error([
    'Bumps a new versioned release of the current state into CHANGELOG.md and package.json',
    'Uses "git" and "npm".\n',
    'Usage: bump-release.js NPM_PACKAGE_DIR [<newversion> | major | minor | patch | prerelease] [options]',
    'Options:',
    '  --verify-script Verification / test script that runs before bumping. [default: "' + defaultVerifyScript + '"]'
  ].join('\n'))
  process.exit(1)
}

const packageJson = require(packageJsonPath)
let newVersion // used as the version that the release should be bumped with

if (semver.valid(toVersion) && semver.gt(toVersion, packageJson.version)) {
  newVersion = toVersion
} else {
  newVersion = semver.inc(packageJson.version, toVersion)
}

if (newVersion === null) {
  console.error('Current version "' + packageJson.version + '" just can be bumped to a higher version')
  process.exit(1)
}

// used to create|merge a major-branch
const newMajorBranchName = semver.parse(newVersion).major + '.x'

const changelogCommands = fileExists(changelogPath) ? [
  '# add version string to CHANGELOG and commit CHANGELOG',
  'echo "\\n### v' + newVersion + ' / ' + formattedDate + '\\n\\n$(cat ' + changelogPath + ')" > ' +
  changelogPath + ' &&',
  'git add ' + changelogPath + ' &&',
  'git commit -m "Prepare CHANGELOG for version v' + newVersion + '" &&'
] : []

const cmd = [].concat([
  '',
  '############ EXECUTE THE FOLLOWING COMMANDS ################',
  'cd ' + cdPath + ' &&',
  '# pull the current upstream state',
  'git pull --all --tags &&',
  '# verify the release',
  argv['verify-script'] + ' & wait $! &&'
], changelogCommands, [
  '# updates package.json, does git commit and git tag',
  'npm version ' + newVersion + ' &&',
  '# push everything upstream',
  'git push &&',
  'git push --tags &&',
  '# save current branch to return to it later',
  'releaseBranchName=$(git symbolic-ref HEAD --short) &&',
  'echo "### checkout|create major-branch ' + newMajorBranchName + ', set upstream to origin" &&',
  'git checkout -B ' + newMajorBranchName + ' &&',
  '# when major branch does not exist on remote, then push it to origin',
  'git ls-remote --exit-code . origin/' + newMajorBranchName + ' || git push origin ' + newMajorBranchName + ' -u  &&',
  '# pull the current upstream state',
  'git fetch --all &&',
  '# update major branch with changes from this release',
  'git merge v' + newVersion + ' &&',
  'git push origin ' + newMajorBranchName + ' -u &&',
  '# go back to release branch',
  'git checkout $releaseBranchName',
  '########### END EXECUTE THE FOLLOWING COMMANDS ##############',
  ''
]).join('\n')

console.log(cmd)

const child = exec(cmd, {maxBuffer: 1024 * 1000}, (error) => {
  if (error) {
    throw error
  }
})

child.stderr.pipe(process.stderr)
child.stdout.pipe(process.stdout)
