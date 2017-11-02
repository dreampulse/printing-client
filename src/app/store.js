import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import {track as trackMixpanel} from 'Service/mixpanel'
import {track as trackGoogleAnalytics} from 'Service/google-analytics'
import {createReduxMiddleware} from 'Service/logging'

import rootReducer from './reducer'

function trackingReduxMiddleware() {
  return next => action => {
    // Only track the production environment
    if (process.env.NODE_ENV === 'production') {
      const actionType = (action && action.type) || 'ACTION UNDEFINED'
      trackMixpanel(actionType)
      trackGoogleAnalytics(actionType)
    }
    return next(action)
  }
}

export default (history, initialState = {}) => {
  let middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
    trackingReduxMiddleware,
    createReduxMiddleware
  )

  if (process.env.NODE_ENV !== 'production') {
    /* eslint global-require: 0 */
    /* eslint import/no-extraneous-dependencies: 0 */
    // Enable redux dev-tools
    middleware = compose(middleware, global.devToolsExtension ? global.devToolsExtension() : f => f)
  }

  // This initialState is empty, because each reducer has its own initial state
  const store = createStore(rootReducer, initialState, middleware)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      /* eslint global-require: 0 */
      /* eslint import/newline-after-import: 0 */
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
