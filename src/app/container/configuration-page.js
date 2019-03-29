import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {replace} from 'react-router-redux'

import {getFeatureFlags, getUrlParams} from '../lib/url'
import {removeBootsplash} from '../service/bootsplash'

import * as coreActions from '../action/core'
import * as configurationAction from '../action/configuration'
import * as navigationAction from '../action/navigation'

import LoadingContainer from '../component/loading-container'

const ConfigurationPage = () => <LoadingContainer />

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  loadConfiguration: configurationAction.loadConfiguration,
  init: coreActions.init
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const {init, loadConfiguration, goToUpload} = this.props

      init({
        featureFlags: getFeatureFlags(global.location),
        urlParams: getUrlParams(global.location)
      })
        .then(() => {
          loadConfiguration(this.props.match.params.id)
          removeBootsplash()
        })
        .then(() => goToUpload(undefined, replace))
    }
  })
)

export default enhance(ConfigurationPage)
