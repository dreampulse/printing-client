import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory, Redirect} from 'react-router'

import Cart from './container/cart'
import Model from './container/model'
import Address from './container/address'

/* eslint-disable react/prop-types */
export default ({store}) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Redirect from="/" to="/model" />

      <Route component={Model} path="/model" />
      <Route component={Address} path="/address" />
      <Route component={Cart} path="/cart" />
    </Router>
  )
}
