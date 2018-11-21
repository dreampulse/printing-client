const childProcess = require('child_process')
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.WEBPACK_ENV || 'development'
const isProd = env === 'production'
const isDev = !isProd

const sentryReleaseVersion = isProd
  ? childProcess
      .execSync(path.resolve(__dirname, 'bin', 'get-sentry-release-version.sh'))
      .toString()
      .trim()
  : 'no-sentry-release'

module.exports = {
  mode: env,
  bail: isProd, // Report first error instead of tolerating it
  target: 'web',
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    path.resolve(__dirname, './src/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/', // All our ressources are placed under the '/'-route (we use aws s3)
    filename: '[name].app.[hash].js',
    // Using the webpack default 'webpack://' conflicts with third-party scripts that have been bundled with webpack
    // As a result, their source folders are merged with ours which can be confusing
    devtoolModuleFilenameTemplate: 'printing-engine-client/[resource-path]'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          isProd
            ? MiniCssExtractPlugin.loader
            : {
                loader: 'style-loader',
                options: {
                  sourceMap: isDev
                }
              },
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
              plugins: [autoprefixer({browsers: ['last 2 versions', 'ie >= 11']})]
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
      },
      {
        test: /\.(ttf|eot|woff2?)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        issuer: /\.js$/, // Prevent usage of icon sprite outside of js
        include: [path.resolve(__dirname, './src/asset/icon')],
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
        // Inline images required from JS.
        test: /\.(jpe?g|png|gif|svg)$/,
        issuer: /\.js$/,
        include: [path.resolve(__dirname, './src/asset/image')],
        use: 'url-loader'
      },
      {
        // File loader for CSS build with paths relative to the CSS file are working.
        test: /\.(jpe?g|png|gif|svg)$/,
        issuer: /\.scss$/,
        include: [path.resolve(__dirname, './src/asset/image')],
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'app.[hash].css',
            chunkFilename: 'app.[id].css'
          })
        ]
      : []),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        SENTRY_RELEASE_VERSION: JSON.stringify(sentryReleaseVersion)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/app/index.html')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/asset'),
        to: path.resolve(__dirname, './dist/asset')
      }
    ])
  ],
  devtool: isDev ? 'eval-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    historyApiFallback: true,
    port: process.env.PORT || 3000
  }
}
