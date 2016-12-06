import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'

import rootReducer from './reducer'


export default (initialState = {}) => {
  let middleware = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(browserHistory)
    )
  )

  if (process.env.NODE_ENV !== 'production') {
    // Enable redux dev-tools
    middleware = compose(
      middleware,
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

  return store;
}
