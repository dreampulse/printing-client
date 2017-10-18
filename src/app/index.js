import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'

import 'babel-polyfill'

import 'Service/logging'

import Store from './store'
import Router from './router'

import '../sass/main.scss'

import {init} from './action/init'

// Stub backend during development. Webpack will remove this in production
if (process.env.NODE_ENV === 'development-with-stubs') require('../../test-data/server-stubs') // eslint-disable-line

const history = createHistory()
const store = Store(history)
store.dispatch(init()).then(() => {
  render(
    <Provider store={store}>
      <Router store={store} history={history} />
    </Provider>,
    global.document.getElementById('root')
  )

  const bootsplash = global.document.getElementById('bootsplash')
  // TODO: lets fade out the bootsplash, looks nicer
  if (bootsplash) { // Otherwise hot reloading breaks
    bootsplash.remove()
  }
})

// Webpack (uglify) will remove this code in the production build
if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV) // eslint-disable-line no-console

  global.store = store

  if (module.hot) { // Enable Webpack hot module replacement
    module.hot.accept()
  }
}
