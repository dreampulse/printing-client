import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import 'babel-polyfill'

import Store from './store'
import Router from './router'

import '../sass-legacy/main.scss'

import init from './action/init'

const store = Store()

store.dispatch(init()).then(() => {
  render(
    <Provider store={store}>
      <Router store={store} />
    </Provider>,
    global.document.getElementById('root')
  )
})

// Webpack (uglify) will remove this code in the production build
if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV) // eslint-disable-line no-console

  if (module.hot) { // Enable Webpack hot module replacement
    module.hot.accept()
  }
}
