import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'
import withProps from 'recompose/withProps'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'

import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getProviderName} from '../lib/material'
import {getBestMultiModelOffers} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice, formatTimeRange, formatDeliveryTime} from '../lib/formatter'
import {
  selectModelConfigsByIds,
  selectQuotes,
  selectUploadedModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'

import {SELECTED_STEP} from './material-partial'

import DescriptionList from '../component/description-list'
import ProviderImage from '../component/provider-image'
import Button from '../component/button'
import OfferFooter from '../component/offer-footer'
import OfferItem from '../component/offer-item'

const OfferPartial = ({
  // Own props
  isEditMode,
  configIds,
  selectedState,
  scrollContainerId,
  onChange,
  // HOC props
  materialConfigs,
  finishGroups,
  addToCart,
  goToCart,
  quotes,
  selectedModelConfigs,
  shippings,
  uploadedModelConfigs,
  usedShippingIds,
  modelConfigs,
  updateSelectedModelConfigs,
  showMore,
  setShowMore,
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

  const hasItemsOnUploadPage = uploadedModelConfigs.some(
    modelConfig => !configIds.find(id => id === modelConfig.id) && !modelConfig.quoteId
  )

  const usedShippingIdsById = keyBy(usedShippingIds, id => id)

  return (
    <OfferFooter showMore={showMore}>
      {(offers.length === 0 || !selectedState.materialConfigId) && (
        <OfferItem
          actions={<Button disabled label={isEditMode ? 'Select offer' : 'Add to cart'} />}
        >
          <DescriptionList>
            <dt>
              <strong>Total (incl. shipping):</strong>
            </dt>
            <dd>
              <strong className="u-font-size-xl">
                {offers.length > 0
                  ? formatPrice(offers[0].totalGrossPrice, offers[0].multiModelQuote.currency)
                  : formatPrice(null, currency)}
              </strong>
            </dd>
          </DescriptionList>
        </OfferItem>
      )}
      {selectedState.materialConfigId &&
        offers.map(({multiModelQuote, shipping, totalGrossPrice}, i) => {
          const materialConfig = materialConfigs[multiModelQuote.materialConfigId]
          const finishGroup = finishGroups[materialConfig.finishGroupId]
          const {productionTimeFast, productionTimeSlow} = materialConfig.printingService[
            multiModelQuote.vendorId
          ]
          const firstOffer = i === 0

          return (
            <OfferItem
              key={i}
              actions={
                <>
                  {firstOffer && offers.length > 1 && !showMore && (
                    <Button text label="See all offers" onClick={() => setShowMore(true)} />
                  )}
                  <Button
                    minor={!firstOffer}
                    label={isEditMode ? 'Select offer' : 'Add to cart'}
                    onClick={() =>
                      addToCart(configIds, multiModelQuote.quotes, shipping).then(() => {
                        // If there are still models to configure stay on material page
                        if (!isEditMode && hasItemsOnUploadPage) {
                          // Since we stay on the same page, we have to reset the state.
                          onChange({
                            materialGroupId: selectedState.materialGroupId,
                            materialId: null,
                            finishGroupId: null,
                            materialConfigId: null,
                            step: SELECTED_STEP.MATERIAL
                          })

                          updateSelectedModelConfigs(
                            modelConfigs
                              .filter(
                                modelConfig =>
                                  modelConfig.type === 'UPLOADED' &&
                                  modelConfig.quoteId === null &&
                                  !configIds.includes(modelConfig.id)
                              )
                              .map(modelConfig => modelConfig.id)
                          )

                          global.document.querySelector(`#${scrollContainerId}`).scrollTo(0, 0)
                        } else {
                          goToCart({
                            selectModelConfigIds: configIds
                          })
                        }
                      })
                    }
                  />
                </>
              }
            >
              <DescriptionList>
                <dt>
                  <strong>Price total:</strong>
                </dt>
                <dd>
                  <strong className={firstOffer ? 'u-font-size-xl' : ''}>
                    {formatPrice(totalGrossPrice, multiModelQuote.currency)}
                  </strong>
                </dd>
                <dt className="u-hide-xlarge">
                  <strong>Est. delivery time:</strong>
                </dt>
                <dd className="u-hide-xlarge">
                  {formatTimeRange(
                    productionTimeFast + parseInt(shipping.deliveryTime, 10),
                    productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                  )}
                </dd>
                <dt className="u-show-xlarge">Production:</dt>
                <dd className="u-show-xlarge">
                  {formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency)}
                </dd>
                <dt className="u-show-xlarge">Shipping:</dt>
                <dd className="u-show-xlarge">
                  {usedShippingIdsById[shipping.shippingId]
                    ? formatPrice(0, shipping.currency)
                    : formatPrice(shipping.grossPrice, shipping.currency)}
                </dd>
              </DescriptionList>
              <DescriptionList classNames={['u-show-xlarge']}>
                <dt>
                  <strong>Est. delivery time:</strong>
                </dt>
                <dd>
                  <strong className={firstOffer ? 'u-font-size-xl' : ''}>
                    {formatTimeRange(
                      productionTimeFast + parseInt(shipping.deliveryTime, 10),
                      productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                    )}
                  </strong>
                </dd>
                <dt>Production:</dt>
                <dd>{formatTimeRange(productionTimeFast, productionTimeSlow)}</dd>
                <dt>Shipping:</dt>
                <dd>{formatDeliveryTime(shipping.deliveryTime)}</dd>
              </DescriptionList>
              <DescriptionList>
                <dt>Process:</dt>
                <dd>{finishGroup.properties.printingMethodShort}</dd>
                <dt>Fulfilled by:</dt>
                <dd>
                  <ProviderImage
                    xs
                    name={getProviderName(multiModelQuote.vendorId)}
                    slug={multiModelQuote.vendorId}
                  />
                </dd>
              </DescriptionList>
            </OfferItem>
          )
        })}
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('showMore', 'setShowMore', false),
  withProps(({materialConfigs, selectedState}) => ({
    selectedMaterialConfig: materialConfigs[selectedState.materialConfigId]
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.selectedState, this.props.selectedState)) {
        this.props.setShowMore(false)
      }
    }
  })
)(OfferPartial)
