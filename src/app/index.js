import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import action from './action'
import store from './store'
import router from './router'

import '../sass/main.scss'

render(
  <Provider store={store}>
    {router}
  </Provider>,
  global.document.getElementById('root')
)

// Webpack (uglify) will remove this code in the production build
if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV) // eslint-disable-line no-console

  // For debugging
  global.action = action
}
