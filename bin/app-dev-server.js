import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import open from 'opn'

import webpackConfig from '../webpack.develop.config'

const port = process.env.PORT || 3000

webpackConfig.entry.push('./src/app')

webpackConfig.plugins.push(
  new HtmlWebpackPlugin({
    template: 'src/app/index.html',
    inject: true
  })
)

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  contentBase: 'src',
  stats: {colors: true},
  quiet: false,
  noInfo: false
}).listen(port, 'localhost', (err) => {
  if (err) console.error(err)
  else {
    console.log(`Webpack Dev Server listening at localhost:${port}`)
    open(`http://localhost:${port}`)
  }
})
