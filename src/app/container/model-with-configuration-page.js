import {compose, lifecycle} from 'recompose'
import {connect} from 'react-redux'

import {
  restoreConfiguration
} from 'Action/direct-sales'

import ModelPage from './model-page'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onRestoreConfiguration: restoreConfiguration
}

const ModelWithConfigurationPage = ModelPage

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount () {
      const configurationId = this.props.params.id
      this.props.onRestoreConfiguration(configurationId)
    }
  })
)(ModelWithConfigurationPage)
