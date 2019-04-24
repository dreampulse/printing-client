import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import App from './container/app'
import OrderStatusPage from './container/order-status-page'
import configurationPage from './container/configuration-page'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={OrderStatusPage} path="/order-status/:id" exact />
      <Route component={configurationPage} path="/configuration/:id" exact />
      <Route component={App} path="/" />
    </Switch>
  </ConnectedRouter>
)
