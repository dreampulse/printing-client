import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'

import CartPage from 'Container/cart-page'
import ModelPage from 'Container/model-page'
import AddressPage from 'Container/address-page'
import SuccessPage from 'Container/success-page'

/* eslint-disable react/prop-types */
export default ({store}) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route component={ModelPage} path="/" />
      <Route component={AddressPage} path="/address" />
      <Route component={CartPage} path="/cart" />
      <Route component={SuccessPage} path="/success" />
    </Router>
  )
}
