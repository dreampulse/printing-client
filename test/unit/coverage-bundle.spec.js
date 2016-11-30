// Include all src files here which should be checked for test coverage.
import glob from 'glob'

const options = {
  cwd: __dirname
}

const srcFiles = [
  // Unit tested folders.
  ...glob.sync('../../src/app/action/**/*.js', options),
  ...glob.sync('../../src/app/lib/**/*.js', options),
  ...glob.sync('../../src/app/reducer/**/*.js', options),
  ...glob.sync('../../src/app/util/**/*.js', options)
]

// We remove index.js from the code coverage bundle because
// we do not test those files by convention.
srcFiles
  .filter((path) => !/\/index\.js$/.test(path))
  .forEach(require)
