import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {replace} from 'react-router-redux'

import * as cartAction from '../action/cart'
import * as navigationAction from '../action/navigation'

import LoadingContainer from '../component/loading-container'

const SharedCartPage = () => <LoadingContainer />

const mapStateToProps = state => ({
  // selectedModelConfigs: state.core.selectedModelConfigs,
  // modelConfigs: state.core.modelConfigs
  currency: state.core.currency
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  loadSharedCart: cartAction.loadSharedCart
}

const enhance = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const {
        loadSharedCart,
        currency,
        match: {
          params: {id}
        }
      } = this.props

      console.log('-- this.props', this.props)
      console.log('-- id', id)
      console.log('-- currency', currency)

      loadSharedCart(id, currency)

      // loadConfiguration(this.props.match.params.id)

      // TODO: Falls die location nicht klar ist,
      // muss hier gewartet werden bis die da ist...
    },
    componentDidUpdate(prevProps) {
      const {goToUpload, modelConfigs} = this.props

      // // If the modelConfig updates we know the loading of the configuration is done
      // if (prevProps.modelConfigs.length < modelConfigs.length) {
      //   const selectModelConfigIds = modelConfigs.map(modelConfig => modelConfig.id)
      //   goToUpload({selectModelConfigIds}, replace)
      // }
    }
  })
)

export default enhance(SharedCartPage)
