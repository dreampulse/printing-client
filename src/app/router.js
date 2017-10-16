import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import CartPage from 'Container/cart-page'
import ModelPage from 'Container/model-page'
import AddressPage from 'Container/address-page'
import SuccessPage from 'Container/success-page'
import ConfigurationPage from 'Container/configuration-page'

/* eslint-disable react/prop-types */
export default ({store, history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={ModelPage} path="/" exact />
      <Route component={AddressPage} path="/address" />
      <Route component={CartPage} path="/cart" />
      <Route component={SuccessPage} path="/success" />
      <Route component={ConfigurationPage} path="/configuration/:id" />
    </Switch>
  </ConnectedRouter>
)
