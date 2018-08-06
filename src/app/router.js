import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import UploadPage from './container-next/upload-page'
import MaterialPage from './container-next/material-page'
import CartPage from './container-next/cart-page'
import AddressPage from './container-next/address-page'
import ReviewOrderPage from './container-next/review-order-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={UploadPage} path="/" exact />
      <Route component={MaterialPage} path="/material" exact />
      <Route component={CartPage} path="/cart" exact />
      <Route component={AddressPage} path="/address" exact />
      <Route component={ReviewOrderPage} path="/review-order" exact />
    </Switch>
  </ConnectedRouter>
)
