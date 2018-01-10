import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import CartPage from './container/cart-page'
import ModelPage from './container/model-page'
import AddressPage from './container/address-page'
import SuccessPage from './container/success-page'
import ConfigurationPage from './container/configuration-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
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
