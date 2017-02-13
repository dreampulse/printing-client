import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {createEpicMiddleware} from 'redux-observable'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'

import rootReducer from './reducer'
import Epic from './epic'

export default (initialState = {}, epic = Epic()) => {
  const epicMiddleware = createEpicMiddleware(epic.rootEpic)

  let middleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    epicMiddleware,
    routerMiddleware(browserHistory)
  )

  if (process.env.NODE_ENV !== 'production') {
    /* eslint global-require: 0 */
    /* eslint import/no-extraneous-dependencies: 0 */
    // const createLogger = require('redux-logger')
    // Enable redux dev-tools
    middleware = compose(
      middleware,
      // applyMiddleware(createLogger()),
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

      module.hot.accept('./epic', () => {
        const rootEpic = require('./epic').default
        epicMiddleware.replaceEpic(rootEpic)
      })
    }

    // Access to the stream for the integration tests
    store.epic$ = epic.epic$
  }

  return store
}
