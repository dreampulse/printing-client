import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import UploadPage from './container/upload-page'
import MaterialPage from './container/material-page'
import CartPage from './container/cart-page'
import AddressPage from './container/address-page'
import ReviewOrderPage from './container/review-order-page'
import SuccessPage from './container/success-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={UploadPage} path="/" exact />
      <Route component={MaterialPage} path="/material" exact />
      <Route component={CartPage} path="/cart" exact />
      <Route component={AddressPage} path="/address" exact />
      <Route component={ReviewOrderPage} path="/review-order" exact />
      <Route component={SuccessPage} path="/success" exact />
    </Switch>
  </ConnectedRouter>
)
