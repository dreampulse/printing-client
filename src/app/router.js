import React from 'react'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'

import CartPage from 'Container/cart-page'
import ModelPage from 'Container/model-page'
import AddressPage from 'Container/address-page'
import SuccessPage from 'Container/success-page'
import ConfigurationPage from 'Container/configuration-page'

const preventDeepLinking = store => (nextState, replace) => {
  // It is only possible to reach other routes than the model page
  // if an offer has been selected
  if (!store.getState().price.selectedOffer) {
    replace('/')
  }
}

/* eslint-disable react/prop-types */
export default ({store}) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return (
    <Router history={history}>
      <Route component={ModelPage} path="/" />
      <Route component={AddressPage} path="/address" onEnter={preventDeepLinking(store)} />
      <Route component={CartPage} path="/cart" onEnter={preventDeepLinking(store)} />
      <Route component={SuccessPage} path="/success" onEnter={preventDeepLinking(store)} />
      <Route component={ConfigurationPage} path="/configuration/:id" />
    </Router>
  )
}
