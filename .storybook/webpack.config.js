// You can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

const config = require('../webpack.config')

module.exports = (baseConfig, _env, _defaultConfig) => {
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
    ...config.module.rules.map(rule =>
      rule.test && rule.test.toString() === /\.scss$/.toString() ? useStyleLoader(rule) : rule
    )
  ]

  return baseConfig
}
