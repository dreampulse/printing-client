const compact = require('lodash/compact')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')

const projectRoot = __dirname
const env = process.env.WEBPACK_ENV || 'development'
const isProd = env === 'production'
const isDev = isProd === false

module.exports = {
  bail: isProd,
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch', // has no footprint in production environment
    path.resolve(projectRoot, './src/app')
  ],
  output: {
    path: path.resolve(projectRoot, './dist'),
    filename: 'bundle.js',
    // Using the webpack default 'webpack://' conflicts with third-party scripts that have been bundled with webpack
    // As a result, their source folders are merged with ours which can be confusing
    devtoolModuleFilenameTemplate: '/all3dp/printing-engine-client/[resource-path]'
  },
  resolve: {
    alias: {
      Image: path.resolve(projectRoot, './src/asset/image'),
      Icon: path.resolve(projectRoot, './src/asset/icon'),
      Action: path.resolve(projectRoot, './src/app/action'),
      Component: path.resolve(projectRoot, './src/app/component'),
      Container: path.resolve(projectRoot, './src/app/container'),
      Lib: path.resolve(projectRoot, './src/app/lib'),
      Reducer: path.resolve(projectRoot, './src/app/reducer'),
      Service: path.resolve(projectRoot, './src/app/service')
    }
  },
  module: {
    // Throw an error in production build if an export can be found
    // See https://github.com/webpack/webpack/pull/4348
    strictExportPresence: isProd,
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: isDev
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
                plugins: [autoprefixer({browsers: ['last 2 versions']})]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            },
            {
              loader: 'import-glob'
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff2?)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /[/\\]node_modules[/\\]/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Speeds up the build by caching the babel-loader results under .cache/babel-loader
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: [path.resolve(projectRoot, './src/asset/icon')],
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: [path.resolve(projectRoot, './src/asset/image')],
        use: 'file-loader'
      }
    ]
  },
  plugins: compact([
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: isDev
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new HtmlPlugin({
      template: path.join(projectRoot, './src/app/index.html'),
      inject: true
    }),
    new CopyPlugin([
      {
        from: path.resolve(projectRoot, 'src', 'asset'),
        to: path.resolve(projectRoot, 'dist', 'asset')
      }
    ]),
    isDev ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    isProd && new webpack.optimize.ModuleConcatenationPlugin(),
    isProd &&
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ie8: false,
          ecma: 6,
          output: {
            beautify: false
          },
          warnings: false
        }
      })
  ]),
  devServer: {
    contentBase: path.join(projectRoot, 'dist'),
    inline: true,
    historyApiFallback: true,
    port: process.env.PORT || 3000
  },
  devtool: isDev ? 'eval-source-map' : 'source-map'
}
