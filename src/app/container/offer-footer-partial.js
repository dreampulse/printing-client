import React from 'react'
import {connect} from 'react-redux'

import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getBestMultiModelOffers} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice} from '../lib/formatter'
import {
  selectModelConfigsByIds,
  selectQuotes,
  selectUploadedModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'

import DescriptionList from '../component/description-list'
import OfferFooter from '../component/offer-footer'

const OfferPartial = ({
  // Own props
  selectedState,
  // HOC props
  materialConfigs,
  quotes,
  selectedModelConfigs,
  shippings,
  usedShippingIds,
  currency
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
    <OfferFooter>
      <DescriptionList>
        <dt>
          <strong>Best price (incl. shipping):</strong>
        </dt>
        <dd>
          <strong className="u-font-size-xl">
            {offers.length > 0
              ? formatPrice(offers[0].totalGrossPrice, offers[0].multiModelQuote.currency)
              : formatPrice(null, currency)}
          </strong>
        </dd>
      </DescriptionList>
    </OfferFooter>
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
  currency: state.core.currency
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  addToCart: cartAction.addToCart,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferPartial)
