// You can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const customConfig = require('../webpack.config')

const useStyleLoader = rule => {
  const [_, ...rest] = rule.use
  return {...rule, use: [{loader: 'style-loader'}, ...rest]}
}

module.exports = async ({config}) => {
  // Avoid using MiniCssExtractPlugin in production build
  config.module.rules = customConfig.module.rules.map(rule =>
    rule.test && rule.test.toString() === /\.scss$/.toString() ? useStyleLoader(rule) : rule
  )

  config.resolve.extensions = [...config.resolve.extensions, ...customConfig.resolve.extensions]

  return config
}
