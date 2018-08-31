// @flow

import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'

import * as configurationAction from '../action/configuration'
import * as navigationAction from '../action/navigation'

import Modal from './modal'

import LoadingContainer from '../component/loading-container'

const ConfigurationPage = () => (
  <Fragment>
    <LoadingContainer />
    <Modal />
  </Fragment>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  loadConfiguration: configurationAction.loadConfiguration
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.loadConfiguration(this.props.match.params.id).then(() => this.props.goToUpload())
    }
  })
)

export default enhance(ConfigurationPage)
