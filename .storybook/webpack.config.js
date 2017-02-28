const webpackConfig = require('../webpack/config')

const config = webpackConfig({
  optimize: false,
  nodeEnv: 'development'
})

// Remove JS loader to use default provided by Storybook
const loaders = config.module.loaders.filter(loader => !(loader.loaders && loader.loaders.indexOf('babel') >= 0))

module.exports = {
  module: {
    loaders
  },
  postcss: config.postcss
}
