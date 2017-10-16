import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

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
export default ({store, history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={ModelPage} path="/" />
      <Route component={AddressPage} path="/address" onEnter={preventDeepLinking(store)} />
      <Route component={CartPage} path="/cart" onEnter={preventDeepLinking(store)} />
      <Route component={SuccessPage} path="/success" onEnter={preventDeepLinking(store)} />
      <Route component={ConfigurationPage} path="/configuration/:id" />
    </Switch>
  </ConnectedRouter>
)
