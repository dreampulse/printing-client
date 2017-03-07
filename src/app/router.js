import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory, Redirect} from 'react-router'

import CartPage from 'Container/cart-page'
import ModelPage from 'Container/model-page'
import AddressPage from 'Container/address-page'

/* eslint-disable react/prop-types */
export default ({store}) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Redirect from="/" to="/model" />
      <Route component={ModelPage} path="/model" />
      <Route component={AddressPage} path="/address" />
      <Route component={CartPage} path="/cart" />
    </Router>
  )
}
