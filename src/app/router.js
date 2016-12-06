import React from 'react'
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './container/app'

export default ({store}) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route component={App} path='/' />
    </Router>
  )
}
