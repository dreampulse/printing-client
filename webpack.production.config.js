const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./src/app'],
  output: {
    path: path.join(process.env.PWD, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style', ExtractTextPlugin.extract([
            'css',
            'postcss',
            'sass',
            'import-glob'
          ])
        ]
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }, {
        test: /\.svg$/,
        loaders: [
          'svg-sprite?' + JSON.stringify({
            name: '[name]'
          }),
          'svgo'
        ]
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SETTINGS_ENV: JSON.stringify(process.env.SETTINGS_ENV || 'production')
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      inject: true
    })
  ]
};
