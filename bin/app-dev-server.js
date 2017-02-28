import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import open from 'opn'

import webpackConfig from '../webpack/config'

const port = process.env.PORT || 3000
const config = webpackConfig({
  devServer: true,
  devServerPort: port,
  optimize: false,
  sourceMaps: true,
  nodeEnv: 'development'
})

new WebpackDevServer(webpack(config), {
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
