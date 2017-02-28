const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = ({
  devServer: devServer = false,
  devServerPort,
  sourceMaps: sourceMaps = false,
  nodeEnv: nodeEnv = 'production',
  optimize: optimize = true
}) => {
  const styleLoaders = [
    sourceMaps ? 'css?sourceMap' : 'css',
    'postcss',
    sourceMaps ? 'sass?sourceMap' : 'sass',
    'import-glob'
  ]

  return {
    entry: devServer
      ? [
        `webpack-dev-server/client?http://localhost:${devServerPort}`,
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/app')
      ] : [
        path.resolve(__dirname, '../src/app')
      ],
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: devServer ? `http://localhost:${devServerPort}/` : '/',
      filename: 'bundle.js'
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js'],
      alias: {
        Image: path.resolve(__dirname, '../src/asset/image'),
        Icon: path.resolve(__dirname, '../src/asset/icon'),
        Action: path.resolve(__dirname, '../src/app/action'),
        Component: path.resolve(__dirname, '../src/app/component'),
        Containter: path.resolve(__dirname, '../src/app/container'),
        Lib: path.resolve(__dirname, '../src/app/lib'),
        Reducer: path.resolve(__dirname, '../src/app/reducer'),
        Service: path.resolve(__dirname, '../src/app/service')
      }
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: [
            'style',
            ...(devServer ? ExtractTextPlugin.extract(styleLoaders) : styleLoaders)
          ]
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
            path.resolve(__dirname, '../src/asset/icon'),
            path.resolve(__dirname, '../src/asset-legacy/icon')  // TODO remove this
          ],
          loaders: [
            `svg-sprite?${JSON.stringify({
              name: '[name]'
            })}`,
            'svgo'
          ]
        }, {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.(jpg|png|gif|svg)$/,
          include: [
            path.resolve(__dirname, '../src/asset/image')
          ],
          loader: 'file'
        }
      ]
    },
    postcss: [autoprefixer({browsers: ['last 2 versions']})],
    plugins: [
      ...(devServer ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin() // webpack process will not exit on error
      ] : [
        new ExtractTextPlugin('app.css')
      ]),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(nodeEnv)
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/app/index.html'),
        inject: true
      }),
      ...(optimize ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
      ] : [])
    ],
    devtool: sourceMaps ? 'eval-source-map' : undefined // https://webpack.github.io/docs/configuration.html#devtool
  }
}
