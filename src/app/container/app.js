import React from 'react'
import {Route, Switch} from 'react-router'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'

import * as coreActions from '../action/core'
import {getFeatureFlags, getUrlParams} from '../lib/url'
import {removeBootsplash} from '../service/bootsplash'
import Modal from './modal'

import UploadPage from './upload-page'
import EditMaterialPage from './edit-material-page'
import CartPage from './cart-page'
import ReviewOrderPage from './review-order-page'
import SuccessPage from './success-page'

const App = () => (
  <>
    <Switch>
      <Route component={UploadPage} path="/" exact />
      <Route component={EditMaterialPage} path="/material" exact />
      <Route component={CartPage} path="/cart" exact />
      <Route component={ReviewOrderPage} path="/review-order" exact />
      <Route component={SuccessPage} path="/success" exact />
    </Switch>
    <Modal />
  </>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  init: coreActions.init
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props
        .init({
          featureFlags: getFeatureFlags(global.location),
          urlParams: getUrlParams(global.location)
        })
        .then(() => {
          removeBootsplash()
        })
    }
  })
)

export default enhance(App)
