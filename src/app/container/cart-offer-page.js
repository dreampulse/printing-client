import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import {replace} from 'react-router-redux'

import * as cartAction from '../action/cart'
import * as navigationAction from '../action/navigation'

import * as selector from '../lib/selector'

import LoadingContainer from '../component/loading-container'

const CartOfferPage = () => <LoadingContainer />

const mapStateToProps = state => ({
  modelConfigs: state.core.modelConfigs,
  unconfiguredModelConfigIds: selector.selectUnconfiguredModelConfigIds(state),
  currency: state.core.currency
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  goToUpload: navigationAction.goToUpload,
  loadOffer: cartAction.loadOffer
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
        loadOffer,
        currency,
        match: {
          params: {id}
        }
      } = this.props
      if (currency) {
        loadOffer(id, currency)
      }
    },
    componentDidUpdate(prevProps) {
      const {
        goToCart,
        goToUpload,
        modelConfigs,
        currency,
        loadOffer,
        unconfiguredModelConfigIds,
        match: {
          params: {id}
        }
      } = this.props

      // We might need to wait until we have a location & currency until we can load the shared cart
      if (!prevProps.currency && currency) {
        loadOffer(id, currency)
      }

      // If the modelConfig updates we know the loading of the cart is done
      if (prevProps.modelConfigs.length < modelConfigs.length) {
        const selectModelConfigIds = modelConfigs.map(modelConfig => modelConfig.id)

        if (unconfiguredModelConfigIds.length > 0) {
          goToUpload({
            notification: {
              message:
                'Some of the models could not be fully restored because the original offer was created in a different country.',
              warning: true
            },
            selectModelConfigIds: unconfiguredModelConfigIds
          })
        } else {
          goToCart({selectModelConfigIds}, replace)
        }
      }
    }
  })
)

export default enhance(CartOfferPage)
