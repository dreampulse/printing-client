import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import keyBy from 'lodash/keyBy'

import * as modalAction from '../action/modal'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getProviderName} from '../lib/material'
import {getBestMultiModelOffersForMaterialConfig} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice, formatTimeRange, formatDeliveryTime} from '../lib/formatter'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  isQuotePollingDone,
  selectQuotes,
  selectUploadedModelConfigs,
  selectCommonMaterialPathOfModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'
import checkoutIcon from '../../asset/icon/checkout.svg'

import DescriptionList from '../component/description-list'
import ProviderImage from '../component/provider-image'
import Button from '../component/button'
import OfferFooter from '../component/offer-footer'
import OfferItem from '../component/offer-item'

const OfferPartial = ({
  materialConfigs,
  finishGroups,
  selectedMaterialConfigId,
  addToCart,
  goToCart,
  quotes,
  selectedModelConfigs,
  shippings,
  configIds,
  uploadedModelConfigs,
  usedShippingIds,
  isEditMode,
  modelConfigs,
  goToReviewOrder,
  updateSelectedModelConfigs,
  resetConfigurationState,
  scrollContainerId,
  showMore,
  setShowMore
}) => {
  // Filter out quotes which do not have a valid shipping method
  const validQuotes = quotes.filter(quote =>
    shippings.some(shipping => shipping.vendorId === quote.vendorId)
  )
  const multiModelQuotes = getMultiModelQuotes(selectedModelConfigs, validQuotes)

  const providerList = getBestMultiModelOffersForMaterialConfig(
    multiModelQuotes,
    usedShippingIds,
    shippings,
    selectedMaterialConfigId
  )

  const hasItemsOnUploadPage = uploadedModelConfigs.some(
    modelConfig => !configIds.find(id => id === modelConfig.id) && !modelConfig.quoteId
  )

  const usedShippingIdsById = keyBy(usedShippingIds, id => id)

  return (
    <OfferFooter showMore={showMore}>
      {providerList.map(({multiModelQuote, shipping, totalGrossPrice}, i) => {
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
                {firstOffer && !showMore && (
                  <Button text label="See all offers" onClick={() => setShowMore(true)} />
                )}
                <Button
                  icon={checkoutIcon}
                  label={isEditMode ? 'Select offer' : 'Add to cart'}
                  onClick={() =>
                    addToCart(configIds, multiModelQuote.quotes, shipping).then(() => {
                      // If there are still models to configure stay on material page
                      if (!isEditMode && hasItemsOnUploadPage) {
                        // Since we stay on the same page, we have to reset the state.
                        resetConfigurationState()

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
                        // Go to review order page if user has configured all uploaded models at once.
                      } else if (
                        !isEditMode &&
                        !hasItemsOnUploadPage &&
                        configIds.length === modelConfigs.length
                      ) {
                        goToReviewOrder()
                      } else {
                        goToCart({
                          numAddedItems: isEditMode ? 0 : configIds.length,
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
                <strong className={firstOffer ? 'u-font-size-l' : ''}>
                  {formatPrice(totalGrossPrice, multiModelQuote.currency)}
                </strong>
              </dd>
              <dt>Production:</dt>
              <dd>{formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency)}</dd>
              <dt>Shipping:</dt>
              <dd>
                {usedShippingIdsById[shipping.shippingId]
                  ? formatPrice(0, shipping.currency)
                  : formatPrice(shipping.grossPrice, shipping.currency)}
              </dd>
            </DescriptionList>
            <DescriptionList>
              <dt>
                <strong>Est. delivery time:</strong>
              </dt>
              <dd>
                <strong className={firstOffer ? 'u-font-size-l' : ''}>
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
  materialGroups: state.core.materialGroups,
  materialConfigs: state.core.materialConfigs,
  finishGroups: state.core.finishGroups,
  pollingProgress: selectQuotePollingProgress(state),
  isPollingDone: isQuotePollingDone(state),
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  featureFlags: state.core.featureFlags,
  currency: state.core.currency,
  location: state.core.location,
  shippings: state.core.shippings,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  commonMaterialPath: selectCommonMaterialPathOfModelConfigs(state, ownProps.configIds),
  usedShippingIds: selectUsedShippingIdsAndFilter(state, ownProps.configIds)
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  goToReviewOrder: navigationAction.goToReviewOrder,
  openMaterialModal: modalAction.openMaterialModal,
  openFinishGroupModal: modalAction.openFinishGroupModal,
  receiveQuotes: quoteAction.receiveQuotes,
  stopReceivingQuotes: quoteAction.stopReceivingQuotes,
  addToCart: cartAction.addToCart,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('showMore', 'setShowMore', false)
)(OfferPartial)
