const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = ({
  devServer = false,
  devServerPort,
  extractStyles = false,
  debugSourceMaps = false,
  nodeEnv = 'production',
  optimize = true
}) => ({
  entry: (devServer)
    ? [
      `webpack-dev-server/client?http://localhost:${devServerPort}/`,
      'webpack/hot/dev-server',
      path.resolve(__dirname, '../src/app')
    ] : [
      path.resolve(__dirname, '../src/app')
    ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: (devServer) ? `http://localhost:${devServerPort}/` : '/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Image: path.resolve(__dirname, '../src/asset/image'),
      Icon: path.resolve(__dirname, '../src/asset/icon'),
      Action: path.resolve(__dirname, '../src/app/action'),
      Component: path.resolve(__dirname, '../src/app/component'),
      Container: path.resolve(__dirname, '../src/app/container'),
      Lib: path.resolve(__dirname, '../src/app/lib'),
      Reducer: path.resolve(__dirname, '../src/app/reducer'),
      Service: path.resolve(__dirname, '../src/app/service')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: debugSourceMaps
            }
          },
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: debugSourceMaps
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: debugSourceMaps,
              plugins: [autoprefixer({browsers: ['last 2 versions']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: debugSourceMaps
            }
          }, {
            loader: 'import-glob'
          }]
        })
      }, {
        test: /\.(ttf|eot|woff2?)$/,
        use: 'file-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, '../src/asset/icon')
        ],
        use: [{
          loader: 'svg-sprite-loader'
        }, {
          loader: 'svgo-loader'
        }]
      }, {
        test: /\.json$/,
        use: 'json-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: [
          path.resolve(__dirname, '../src/asset/image')
        ],
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    ...(devServer ? [
      new webpack.HotModuleReplacementPlugin()
    ] : []),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !extractStyles
    }),
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
      })
    ] : [])
  ],
  devtool: debugSourceMaps ? 'eval-source-map' : 'source-map'
})
