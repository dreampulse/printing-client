import React from 'react'
import {compose, lifecycle, renderComponent, branch, withState} from 'recompose'
import {connect} from 'react-redux'

import {restoreConfiguration} from 'Action/configuration'

import LoadingContainer from 'Component/loading-container'
import ModelPage from './model-page'
import DirectConfigurationPage from './direct-configuration-page'

const mapStateToProps = state => ({
  configurationId: state.configuration.configurationId,
  isDirectSales: state.configuration.isDirectSales
})

const mapDispatchToProps = {
  onRestoreConfiguration: restoreConfiguration
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('isLoading', 'setIsLoading', true),
  lifecycle({
    componentWillMount() {
      const {match: {params}, configurationId, onRestoreConfiguration} = this.props

      // Restore only if configuration id changed
      if (configurationId !== params.id) {
        onRestoreConfiguration(params.id).then(() => {
          this.props.setIsLoading(false)
        })
      } else {
        this.props.setIsLoading(false)
      }
    }
  }),
  branch(
    props => props.isLoading,
    renderComponent(() => (
      <div>
        <LoadingContainer />
      </div>
    ))
  ),
  branch(props => props.isDirectSales, renderComponent(DirectConfigurationPage))
)(ModelPage)
