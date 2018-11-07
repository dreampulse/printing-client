// You can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../webpack.config')

module.exports = (baseConfig, env, defaultConfig) => {
  const jsxRegExpString = /\.jsx$/.toString()

  const useStyleLoader = rule => {
    const [_, ...rest] = rule.use
    return {...rule, use: [{loader: 'style-loader'}, ...rest]}
  }

  baseConfig.module.rules = [
    ...baseConfig.module.rules.filter(
      rule => rule.test && rule.test.toString() !== jsxRegExpString
    ),
    // Avoid using MiniCssExtractPlugin in production build
    ...config.module.rules.map(
      rule =>
        rule.test && rule.test.toString() === /\.scss$/.toString() ? useStyleLoader(rule) : rule
    )
  ]

  return baseConfig
}

/*

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


*/
