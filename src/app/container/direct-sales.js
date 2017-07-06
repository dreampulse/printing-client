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

// TODO: We use here the ModelPage as a temporary solution until we have the UI-Componentes
const DirectSales = ModelPage

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount () {
      const configurationId = this.props.params.id
      this.props.onRestoreConfiguration(configurationId)
    }
  })
)(DirectSales)
