import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {replace} from 'react-router-redux'

import * as configurationAction from '../action/configuration'
import * as navigationAction from '../action/navigation'

import LoadingContainer from '../component/loading-container'

const ConfigurationPage = () => <LoadingContainer />

const mapStateToProps = state => ({
  selectedModelConfigs: state.core.selectedModelConfigs,
  modelConfigs: state.core.modelConfigs
})

const mapDispatchToProps = {
  goToUpload: navigationAction.goToUpload,
  loadConfiguration: configurationAction.loadConfiguration
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const {loadConfiguration} = this.props

      loadConfiguration(this.props.match.params.id)
    },
    componentDidUpdate(prevProps) {
      const {goToUpload, modelConfigs} = this.props

      // If the modelConfig updates we know the loading of the configuration is done
      if (prevProps.modelConfigs.length < modelConfigs.length) {
        const selectModelConfigIds = modelConfigs.map(modelConfig => modelConfig.id)
        goToUpload({selectModelConfigIds}, replace)
      }
    }
  })
)

export default enhance(ConfigurationPage)
