const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const config = require('../webpack.config')

const jsTestRegExpString = /\.js$/.toString()

// Remove JS loader to use default provided by Storybook
const rules = config.module.rules.filter(
  rule => !rule.test || rule.test.toString() !== jsTestRegExpString
)

config.plugins = config.plugins.filter(
  plugin =>
    plugin instanceof HtmlWebpackPlugin === false &&
    plugin instanceof webpack.optimize.UglifyJsPlugin === false
)

module.exports = {
  resolve: config.resolve,
  module: {
    rules
  },
  plugins: config.plugins
}
