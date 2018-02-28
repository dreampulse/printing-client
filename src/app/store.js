import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import {install as installReduxLoop} from 'redux-loop'
import {track as trackMixpanel} from './service/mixpanel'
import {track as trackGoogleAnalytics} from './service/google-analytics'
import {ravenMiddleware} from './service/logging'

import rootReducer from './reducer'

function legacyThunk({dispatch, getState}) {
  const getLegacyState = () => getState().legacy

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getLegacyState)
    }

    return next(action)
  }
}

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
  let enhancer = compose(
    installReduxLoop(),
    applyMiddleware(
      legacyThunk,
      routerMiddleware(history),
      trackingReduxMiddleware,
      ravenMiddleware
    )
  )

  if (global.devToolsExtension) {
    // Enable redux dev-tools
    enhancer = compose(enhancer, global.devToolsExtension())
  }

  // This initialState is empty, because each reducer has its own initial state
  const store = createStore(rootReducer, initialState, enhancer)

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
