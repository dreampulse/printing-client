import React from 'react'
import {ConnectedRouter} from 'react-router-redux'
import {Route, Switch} from 'react-router'

import MainApp from './container/main-app'
import OrderStatusApp from './container/order-status-app'

/* eslint-disable react/prop-types */
export default ({history}) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route component={OrderStatusApp} path="/order-status/:id" exact />
      <Route component={MainApp} path="/" />
    </Switch>
  </ConnectedRouter>
)
