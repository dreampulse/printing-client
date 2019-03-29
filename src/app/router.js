import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import UploadPage from './container/upload-page'
import EditMaterialPage from './container/edit-material-page'
import CartPage from './container/cart-page'
import ReviewOrderPage from './container/review-order-page'
import SuccessPage from './container/success-page'
import ConfigurationPage from './container/configuration-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={UploadPage} path="/" exact />
      <Route component={EditMaterialPage} path="/material" exact />
      <Route component={CartPage} path="/cart" exact />
      <Route component={ReviewOrderPage} path="/review-order" exact />
      <Route component={SuccessPage} path="/success" exact />
      <Route component={ConfigurationPage} path="/configuration/:id" exact />
    </Switch>
  </ConnectedRouter>
)
