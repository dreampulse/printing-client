const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const port = process.env.PORT || 3000

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/only-dev-server'
    // add entry path here...
  ],
  output: {
    path: process.env.PWD,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // Had to remove source maps because of the following issue:
        // https://github.com/webpack/style-loader/issues/55
        // The workaround described there, did not work for me.
        // loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap', 'import-glob']
        loaders: ['style', 'css', 'postcss', 'sass', 'import-glob']
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, 'src/asset/icon')
        ],
        loaders: [
          'svg-sprite?' + JSON.stringify({
            name: '[name]'
          }),
          'svgo'
        ]
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),  // webpack process will not exit on error
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devtool: 'eval-source-map'  // https://webpack.github.io/docs/configuration.html#devtool
}
