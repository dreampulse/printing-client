import React from 'react'
import {connect} from 'react-redux'

import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'
import * as modalActions from '../action/modal'

import {getBestMultiModelOffers} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice, formatLocation} from '../lib/formatter'
import {
  selectModelConfigsByIds,
  selectQuotes,
  selectUploadedModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'

import infoIcon from '../../asset/icon/info.svg'

import OfferFooter from '../component/offer-footer'
import Link from '../component/link'
import Button from '../component/button'
import Tooltip from '../component/tooltip'

const OfferPartial = ({
  // Own props
  selectedState,
  // HOC props
  materialConfigs,
  quotes,
  selectedModelConfigs,
  shippings,
  usedShippingIds,
  currency,
  location,
  openPickLocationModal
}) => {
  // Filter out quotes which do not have a valid shipping method
  const validQuotes = quotes.filter(quote =>
    shippings.some(shipping => shipping.vendorId === quote.vendorId)
  )
  const multiModelQuotes = getMultiModelQuotes(selectedModelConfigs, validQuotes)
  const offers = selectedState.materialId
    ? getBestMultiModelOffers(multiModelQuotes, usedShippingIds, shippings, materialConfigs, {
        materialConfigId: selectedState.materialConfigId,
        finishGroupId: selectedState.finishGroupId,
        materialId: selectedState.materialId
      })
    : []

  return (
    <OfferFooter
      priceLabel="Best Price"
      price={
        offers.length > 0
          ? formatPrice(offers[0].totalGrossPrice, offers[0].multiModelQuote.currency)
          : formatPrice(null, currency)
      }
      subline={
        <>
          Includes shipping costs to{' '}
          <Link
            onClick={event => {
              event.preventDefault()
              openPickLocationModal({isCloseable: true})
            }}
            label={formatLocation(location)}
          />
          .{' '}
          <Tooltip
            timeout={5000}
            content={
              <>
                All prices displayed take into consideration your provided location as well asthat
                of the most ideal manufacturer, shipping and tax estimatesincluded.
              </>
            }
          >
            <Button icon={infoIcon} iconOnly />
          </Tooltip>
        </>
      }
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  modelConfigs: state.core.modelConfigs,
  quotes: selectQuotes(state),
  materialConfigs: state.core.materialConfigs,
  materials: state.core.materials,
  finishGroups: state.core.finishGroups,
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  shippings: state.core.shippings,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  usedShippingIds: selectUsedShippingIdsAndFilter(state, ownProps.configIds),
  currency: state.core.currency,
  location: state.core.location
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  addToCart: cartAction.addToCart,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  openPickLocationModal: modalActions.openPickLocationModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferPartial)
