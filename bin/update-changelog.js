#!/usr/bin/env node
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const minimist = require('minimist')

const argv = minimist(process.argv, {
  boolean: ['dry-run', 'help'],
  default: {
    'dry-run': false
  }
})

const exec = childProcess.exec
const rootDirectory = argv._.pop()

const changelogName = 'CHANGELOG.md'
const changelogPath = path.resolve(process.cwd(), rootDirectory, changelogName)

if (argv.help) {
  console.log([
    `Adds merged pulled requests since last versioned release to ${changelogName}`,
    'Supports pull requests from Github and Bitbucket. Uses "git" and "npm".\n',
    'Usage: update-changelog.js ROOT_DIR',
    'Options:',
    '  --help Output help',
    '  --dry-run Outputs changes instead of writing to CHANGELOG.md.'
  ].join('\n'))
  process.exit(0)
}

function getPullRequests (callback) {
  // Get latest 500 pull requests
  const cmd = 'git --no-pager log --grep \'Merged in .* (pull request #.*)\' ' +
    '--grep \'Merge pull request #.*\' --merges ' +
    '--pretty=\'format:__pr-start__%n%h%n%an%n%b%n__pr-end__\' -500'
  const child = exec(cmd, (error, stdout) => {
    if (error) {
      throw error
    }
    const pullRequests = []
    let group

    stdout.split('\n').forEach((line) => {
      if (!line) {
        // Filter empty lines

      } else if (line === '__pr-start__') {
        group = []
      } else if (line === '__pr-end__') {
        const commit = group.shift()
        const reviewer = group.shift()
        const message = group.join().replace(/\n|\r/g, '').trim()
        pullRequests.push({
          commit,
          reviewer,
          message
        })
      } else {
        group.push(line)
      }
    })
    callback(pullRequests)
  })
  child.stderr.pipe(process.stderr)
}

function findLatestCommitInChangelog (callback) {
  const matcher = /c: ([^)]+)\)$/
  let commit
  const input = fs.createReadStream(changelogPath)
  const lineReader = readline.createInterface({input})

  input.on('error', () => {
    console.error('Warning: %s does not exist, yet. Attempt to create file now.', changelogName)
    callback(null)
  })

  lineReader.on('line', (line) => {
    if (commit) {
      return
    }

    const matches = matcher.exec(line)
    if (matches) {
      commit = matches[1]
    }
  })

  lineReader.on('close', () => {
    callback(commit)
  })
}

function resolveImplementers (pullRequests, callback) {
  function next (pos) {
    if (pos >= pullRequests.length) {
      callback(pullRequests)
      return
    }

    // The second parent is always the latest commit of the merged branch
    const cmd = `git show ${pullRequests[pos].commit}^2 --format='%an' --no-patch`
    const child = exec(cmd, (error, stdout, stderr) => {
      if (error) {
        throw error
      }

      /* eslint-disable no-param-reassign */
      pullRequests[pos].implementer = stdout.replace(/\n|\r/g, '').trim()

      next(pos + 1)
    })
    child.stderr.pipe(process.stderr)
  }

  next(0)
}

function stringifyPullRequests (pullRequests) {
  return pullRequests.map(request => `- ${request.message
      } (i: ${request.implementer
      }, r: ${request.reviewer
      }, c: ${request.commit})\n`).join('')
}

function prependToChangelog (str) {
  let data = new Buffer('')
  try {
    data = fs.readFileSync(changelogPath) // Read existing contents into data
  } catch (error) {
    // Ignore when changelog does not exist yet.
  }

  const fd = fs.openSync(changelogPath, 'w+')
  const buffer = new Buffer(str)
  fs.writeSync(fd, buffer, 0, buffer.length) // Write new data
  fs.writeSync(fd, data, 0, data.length) // Append old data
  fs.close(fd)
}

getPullRequests((pullRequests) => {
  findLatestCommitInChangelog((latestCommit) => {
    let newPullRequests = pullRequests

    // If there are already entries in the changelog
    // find those which are new by comparing the latest entry with the pull requests list.
    if (latestCommit) {
      newPullRequests = []
      for (let i = 0; i < pullRequests.length; i++) {
        if (pullRequests[i].commit === latestCommit) {
          break
        }
        newPullRequests.push(pullRequests[i])
      }
    }

    if (newPullRequests.length === 0) {
      console.error('Error: There are no new changes!')
      process.exit(1)
    }

    resolveImplementers(newPullRequests, () => {
      const changeString = stringifyPullRequests(newPullRequests)

      if (argv['dry-run']) {
        console.log(changeString)
      } else {
        prependToChangelog(changeString)
      }
    })
  })
})
