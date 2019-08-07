import React, {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router'
import {connect} from 'react-redux'
import lifecycle from 'recompose/lifecycle'

import * as coreActions from '../action/core'
import {getFeatureFlags, getUrlParams} from '../lib/url'
import {removeBootsplash} from '../service/bootsplash'

import AppLayout from '../component/app-layout'
import NavBarPartial from './nav-bar-partial'
import UploadPage from './upload-page'
import MaterialPage from './material-page'
import EditMaterialPage from './edit-material-page'
import CartPage from './cart-page'
import SuccessPage from './success-page'
import ConfigurationPage from './configuration-page'

import Modal from './modal'

const Empty = lifecycle({
  componentDidMount() {
    this.props.onMount()
  }
})(() => null)

const MainApp = ({initDone, initTriggered, initAction}) => {
  const init = initParams => () => {
    if (!initTriggered) {
      initAction({
        featureFlags: getFeatureFlags(global.location),
        urlParams: getUrlParams(global.location),
        ...initParams
      }).then(() => {
        removeBootsplash()
      })
    }
  }

  if (!initDone) {
    return (
      <Switch>
        <Route
          path="/configuration/:id"
          exact
          render={() => <Empty onMount={init({restoreSessionEnabled: false})} />}
        />
        <Route render={() => <Empty onMount={init({restoreSessionEnabled: true})} />} />
      </Switch>
    )
  }

  return (
    <AppLayout header={<NavBarPartial />}>
      <Switch>
        <Route component={UploadPage} path="/" exact />
        <Route component={MaterialPage} path="/material" exact />
        <Route component={EditMaterialPage} path="/material/edit" exact />
        <Route component={CartPage} path="/cart" exact />
        <Route component={SuccessPage} path="/success" exact />
        <Route component={ConfigurationPage} path="/configuration/:id" exact />
        <Redirect to="/" />
      </Switch>
      <Modal />
    </AppLayout>
  )
}

const mapStateToProps = state => ({
  initTriggered: state.core.initTriggered,
  initDone: state.core.initDone
})

const mapDispatchToProps = {
  initAction: coreActions.init
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp)
