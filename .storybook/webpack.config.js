const webpackDevelopConfig = require('../webpack.develop.config')

// Remove JS loader to use default provided by Storybook
const loaders = webpackDevelopConfig.module.loaders.filter((loader) => {
  return !(loader.loaders && loader.loaders.indexOf('babel') >= 0)
})

module.exports = {
  module: {
    loaders
  },
  postcss: webpackDevelopConfig.postcss
}
