import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import {track} from 'Service/mixpanel'

import rootReducer from './reducer'

function trackingReduxMiddleware () {
  return next => (action) => {
    if (typeof action === 'object') {
      track(action.type, action)
    }

    return next(action)
  }
}

export default (initialState = {}) => {
  let middleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    routerMiddleware(browserHistory),
    trackingReduxMiddleware
  )

  if (process.env.NODE_ENV !== 'production') {
    /* eslint global-require: 0 */
    /* eslint import/no-extraneous-dependencies: 0 */
    // Enable redux dev-tools
    middleware = compose(
      middleware,
      // applyMiddleware(require('redux-logger')()),
      global.devToolsExtension ? global.devToolsExtension() : f => f
    )
  }

  // This initialState is empty, because each reducer has its own initial state
  const store = createStore(rootReducer, initialState, middleware)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) { // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducer', () => {
        /* eslint global-require: 0 */
        /* eslint import/newline-after-import: 0 */
        const nextReducer = require('./reducer').default
        store.replaceReducer(nextReducer)
      })
    }
  }

  return store
}
