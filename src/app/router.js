import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import UploadPage from './container-next/upload-page'
import CartPage from './container-next/cart-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={UploadPage} path="/" exact />
      <Route component={CartPage} path="/cart" exact />
    </Switch>
  </ConnectedRouter>
)
