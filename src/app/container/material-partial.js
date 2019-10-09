import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import keyBy from 'lodash/keyBy'
import defer from 'lodash/defer'
import chunk from 'lodash/chunk'

import * as modalAction from '../action/modal'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import config from '../../../config'
import {getBestMultiModelOffers} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {
  formatPrice,
  formatPriceDifference,
  formatTimeRange,
  formatDeliveryTime
} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {partitionBy} from '../lib/util'
import {getProviderName} from '../lib/material'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  selectQuotes,
  selectUploadedModelConfigs,
  selectUsedShippingIdsAndFilter,
  selectIsPollingDone
} from '../lib/selector'
import {createMaterialSearch} from '../service/search'
import {openIntercom} from '../service/intercom'
import scrollTo from '../service/scroll-to'
import useBreakpoints from '../hook/use-breakpoints'

import MaterialFilterPartial from './material-filter-partial'

import Grid from '../component/grid'
import Column from '../component/column'
import Headline from '../component/headline'
import MaterialCard from '../component/material-card'
import Price from '../component/price'
import RadioButton from '../component/radio-button'
import RadioButtonGroup from '../component/radio-button-group'
import MaterialSlider from '../component/material-slider'
import Paragraph from '../component/paragraph'
import Icon from '../component/icon'
import Button from '../component/button'
import DescriptionList from '../component/description-list'
import LoadingCheckmark from '../component/loading-checkmark'
import ColorCard from '../component/color-card'
import ColorTrait from '../component/color-trait'
import ColorCardList from '../component/color-card-list'
import MaterialStepSection from '../component/material-step-section'
import RecommendedOfferSection from '../component/recommended-offer-section'
import OfferCard from '../component/offer-card'
import OfferList from '../component/offer-list'
import OfferItem from '../component/offer-item'
import Tooltip from '../component/tooltip'
import ProviderImage from '../component/provider-image'

import fastestIcon from '../../asset/icon/fastest.svg'
import cheapestIcon from '../../asset/icon/cheapest.svg'
import infoIcon from '../../asset/icon/info.svg'
import providerImages from '../../asset/image/printing-service'

const MaterialPartial = ({
  // Own props
  isEditMode,
  selectedState,
  scrollContainerId,
  configIds,
  onChange,
  // HOC props
  modelConfigs,
  materialGroups,
  materials,
  finishGroups,
  materialConfigs,
  filteredMaterials,
  selectedMaterialGroup,
  selectedMaterial,
  materialFilter,
  selectMaterialGroup,
  selectMaterial,
  selectMaterialConfig,
  selectedMaterialConfig,
  selectedFinishGroup,
  selectFinishGroup,
  setMaterialFilter,
  openMaterialModal,
  openFinishGroupModal,
  openProviderModal,
  quotes,
  selectedModelConfigs,
  shippings,
  usedShippingIds,
  pollingProgress,
  addToCart,
  goToCart,
  uploadedModelConfigs,
  updateSelectedModelConfigs,
  showAllOffers,
  setShowAllOffers,
  isPollingDone
}) => {
  const breakpoints = useBreakpoints()
  const hasAtLeastOneResult = pollingProgress.complete > 0

  // Filter out quotes which do not have a valid shipping method
  const validQuotes = quotes.filter(quote =>
    shippings.some(shipping => shipping.vendorId === quote.vendorId)
  )
  const multiModelQuotes = getMultiModelQuotes(selectedModelConfigs, validQuotes)

  const hasItemsOnUploadPage = uploadedModelConfigs.some(
    modelConfig => !configIds.find(id => id === modelConfig.id) && !modelConfig.quoteId
  )

  const usedShippingIdsById = keyBy(usedShippingIds, id => id)

  const byPrice = ([_a, bestOfferA], [_b, bestOfferB]) => {
    // Sort all without offers to the end
    if (!bestOfferA && bestOfferB) {
      return 1
    }
    if (bestOfferA && !bestOfferB) {
      return -1
    }
    if (!bestOfferA && !bestOfferB) {
      return 0
    }

    return bestOfferA.totalGrossPrice !== bestOfferB.totalGrossPrice
      ? bestOfferA.totalGrossPrice > bestOfferB.totalGrossPrice
        ? 1
        : -1
      : 0
  }

  const renderPrice = (offer, compareOffer) => {
    let price
    if (offer) {
      if (compareOffer) {
        price = formatPriceDifference(
          offer.totalGrossPrice,
          compareOffer.totalGrossPrice,
          offer.multiModelQuote.currency
        )
      } else {
        price = formatPrice(offer.totalGrossPrice, offer.multiModelQuote.currency)
      }
    }

    return (
      <Price
        value={price}
        loadingCheckmark={
          <LoadingCheckmark done={isPollingDone} hideAfterTimeout={hasAtLeastOneResult} />
        }
      />
    )
  }

  const renderMaterialSection = () => {
    const renderMaterialCard = material => {
      const [bestOffer] = getBestMultiModelOffers(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfigs,
        {
          materialId: material.id
        }
      )

      return (
        <MaterialCard
          selectOnImageClick={breakpoints['mobile-only']}
          key={material.id}
          title={material.name}
          description={material.descriptionShort}
          descriptionHeadline="Best used for:"
          price={renderPrice(bestOffer)}
          hasPriceSubline
          priceSublineLabel={
            bestOffer && (
              <>
                Total price incl. shipping{' '}
                <Tooltip
                  timeout={5000}
                  content="The total price includes production, shipping, and additional costs."
                >
                  <Button icon={infoIcon} iconOnly tiny />
                </Tooltip>
              </>
            )
          }
          image={getCloudinaryUrl(material.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestOffer}
          unavailable={!bestOffer && isPollingDone}
          selected={selectedMaterial && selectedMaterial.id === material.id}
          onSelectClick={() => {
            selectMaterial(material.id)
          }}
          onMoreClick={() => {
            openMaterialModal(material.id)
          }}
          onUnavailableClick={() => openIntercom()}
        />
      )
    }

    const showMaterials =
      filteredMaterials ||
      (selectedMaterialGroup && selectedMaterialGroup.materials) ||
      Object.values(materials)

    const sortMaterials = unsortedMaterials =>
      partitionBy(
        unsortedMaterials,
        material =>
          getBestMultiModelOffers(multiModelQuotes, usedShippingIds, shippings, materialConfigs, {
            materialId: material.id
          }).length > 0
      )

    return (
      <MaterialStepSection headline={<Headline size="l" light label="1. Select Material" />}>
        <Grid>
          <Column lg={8} classNames={['u-margin-bottom']}>
            <RadioButtonGroup
              tiny
              name="material-group"
              value={(selectedMaterialGroup && selectedMaterialGroup.id) || undefined}
              onChange={selectMaterialGroup}
            >
              <RadioButton key="__ALL__" value={undefined} label="All" />
              {Object.values(materialGroups).map(group => (
                <RadioButton key={group.id} value={group.id} label={group.name} />
              ))}
            </RadioButtonGroup>
          </Column>
          <Column lg={4} classNames={['u-margin-bottom']}>
            <MaterialFilterPartial
              materialFilter={materialFilter}
              onFilterMaterials={setMaterialFilter}
            />
          </Column>
        </Grid>
        {showMaterials.length > 0 && (
          <MaterialSlider>{sortMaterials(showMaterials).map(renderMaterialCard)}</MaterialSlider>
        )}
        {showMaterials.length === 0 && (
          <Paragraph size="l" classNames={['u-align-center']}>
            No materials found.
          </Paragraph>
        )}
      </MaterialStepSection>
    )
  }

  const renderFinishSection = () => {
    const [compareOffer] = getBestMultiModelOffers(
      multiModelQuotes,
      usedShippingIds,
      shippings,
      materialConfigs,
      {
        materialId: selectedState.materialId,
        finishGroupId: selectedState.finishGroupId
      }
    )

    const renderFinishCard = ([finishGroup, bestOffer]) => (
      <MaterialCard
        key={finishGroup.id}
        title={finishGroup.name}
        description={finishGroup.descriptionShort}
        price={renderPrice(bestOffer, compareOffer)}
        image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
        loading={!bestOffer}
        unavailable={!bestOffer && isPollingDone}
        selected={selectedFinishGroup && selectedFinishGroup.id === finishGroup.id}
        onSelectClick={() => {
          selectFinishGroup(finishGroup.id)
        }}
        onMoreClick={() => {
          openFinishGroupModal(finishGroup.id)
        }}
        onUnavailableClick={() => openIntercom()}
      />
    )

    const withBestOfferForFinishGroup = finishGroup => {
      const [bestOffer] = getBestMultiModelOffers(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfigs,
        {
          finishGroupId: finishGroup.id
        }
      )

      return [finishGroup, bestOffer]
    }

    return (
      <MaterialStepSection
        headline={<Headline size="l" light label="2. Select Variation/Finish" />}
        fadeIn
      >
        <MaterialSlider>
          {selectedMaterial &&
            selectedMaterial.finishGroups.length > 0 &&
            selectedMaterial.finishGroups
              .map(withBestOfferForFinishGroup)
              .sort(byPrice)
              .map(renderFinishCard)}
        </MaterialSlider>
      </MaterialStepSection>
    )
  }

  const renderColorSection = () => {
    const [compareOffer] = getBestMultiModelOffers(
      multiModelQuotes,
      usedShippingIds,
      shippings,
      materialConfigs,
      {
        materialId: selectedState.materialId,
        finishGroupId: selectedState.finishGroupId,
        materialConfigId: selectedState.materialConfigId
      }
    )

    const withBestOfferForMaterialConfig = materialConfig => {
      const [bestOffer] = getBestMultiModelOffers(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfigs,
        {
          materialConfigId: materialConfig.id
        }
      )

      return [materialConfig, bestOffer]
    }

    const renderColorCard = ([materialConfig, bestOffer]) => (
      <ColorCard
        key={materialConfig.id}
        colorTrait={
          <ColorTrait
            color={materialConfig.colorCode}
            image={
              materialConfig.colorImage &&
              getCloudinaryUrl(materialConfig.colorImage, ['w_30', 'h_30', 'c_fill'])
            }
          />
        }
        title={materialConfig.color}
        price={renderPrice(bestOffer, compareOffer)}
        loading={!bestOffer}
        unavailable={!bestOffer && isPollingDone}
        selected={selectedMaterialConfig && selectedMaterialConfig.id === materialConfig.id}
        onSelectClick={() => {
          selectMaterialConfig(materialConfig.id)
        }}
        onUnavailableClick={() => openIntercom()}
      />
    )

    return (
      <MaterialStepSection headline={<Headline size="l" light label="3. Select Color" />} fadeIn>
        {selectedFinishGroup && (
          <>
            {breakpoints.tablet && (
              <ColorCardList>
                {selectedFinishGroup.materialConfigs
                  .map(withBestOfferForMaterialConfig)
                  .sort(byPrice)
                  .map(renderColorCard)}
              </ColorCardList>
            )}
            {!breakpoints.tablet && (
              <MaterialSlider>
                {chunk(
                  selectedFinishGroup.materialConfigs
                    .map(withBestOfferForMaterialConfig)
                    .sort(byPrice)
                    .map(renderColorCard),
                  3
                ).map((elements, index) => (
                  <React.Fragment key={index}>
                    {elements.map((element, elementIndex) =>
                      React.cloneElement(element, {
                        classNames: elementIndex < 2 ? ['u-margin-bottom-l'] : []
                      })
                    )}
                  </React.Fragment>
                ))}
              </MaterialSlider>
            )}
          </>
        )}
      </MaterialStepSection>
    )
  }

  const renderOffersSection = () => {
    const getDeliveryTime = ({multiModelQuote, shipping}) => {
      const {productionTimeFast} = materialConfigs[
        multiModelQuote.materialConfigId
      ].printingService[multiModelQuote.vendorId]

      return productionTimeFast + parseInt(shipping.deliveryTime, 10)
    }

    const renderOfferCard = ({multiModelQuote, shipping, totalGrossPrice}, isCheapest = false) => {
      const materialConfig = materialConfigs[multiModelQuote.materialConfigId]
      const finishGroup = finishGroups[materialConfig.finishGroupId]
      const {productionTimeFast, productionTimeSlow} = materialConfig.printingService[
        multiModelQuote.vendorId
      ]
      return (
        <OfferCard
          icon={<Icon source={isCheapest ? cheapestIcon : fastestIcon} />}
          label={isCheapest ? 'Best Total Price' : 'Fastest'}
          mainValue={
            isCheapest
              ? formatPrice(totalGrossPrice, multiModelQuote.currency)
              : formatTimeRange(
                  productionTimeFast + parseInt(shipping.deliveryTime, 10),
                  productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                )
          }
          subline={`${finishGroup.materialName}, ${finishGroup.name} (${materialConfig.color})`}
          action={
            <Button
              primary
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
                      materialConfigId: null
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
                      selectModelConfigIds: isEditMode ? configIds : []
                    })
                  }
                })
              }
            />
          }
        >
          {!breakpoints.tablet && (
            <>
              <DescriptionList>
                <dt>
                  <em>Total:</em>
                </dt>
                <dd className="u-align-right">
                  {formatPrice(totalGrossPrice, multiModelQuote.currency)}&nbsp;&nbsp;&nbsp;
                  {formatTimeRange(
                    productionTimeFast + parseInt(shipping.deliveryTime, 10),
                    productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                  )}
                </dd>
              </DescriptionList>
              <DescriptionList
                topline={
                  <em>
                    {finishGroup.materialName}, {finishGroup.name} ({materialConfig.color})
                  </em>
                }
              >
                <dt>Process:</dt>
                <dd>{finishGroup.properties.printingMethodShort}</dd>
                <dt>Produced by:</dt>
                <dd>
                  <ProviderImage
                    inline
                    src={providerImages[multiModelQuote.vendorId]}
                    onClick={event => {
                      event.preventDefault()
                      openProviderModal(multiModelQuote.vendorId)
                    }}
                    alt={getProviderName(multiModelQuote.vendorId)}
                  />
                </dd>
              </DescriptionList>
            </>
          )}
          {breakpoints.tablet && (
            <>
              <DescriptionList doubleValues>
                <dt>
                  <em>Total:</em>
                </dt>
                <dd className="u-align-right">
                  <em>{formatPrice(totalGrossPrice, multiModelQuote.currency)}</em>
                </dd>
                <dd>
                  <em>
                    {formatTimeRange(
                      productionTimeFast + parseInt(shipping.deliveryTime, 10),
                      productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                    )}
                  </em>
                </dd>
                <dt>Production:</dt>
                <dd className="u-align-right">
                  {formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency)}
                </dd>
                <dd>{formatTimeRange(productionTimeFast, productionTimeSlow)}</dd>
                <dt>Shipping:</dt>
                <dd className="u-align-right">
                  {usedShippingIdsById[shipping.shippingId]
                    ? formatPrice(0, shipping.currency)
                    : formatPrice(shipping.grossPrice, shipping.currency)}
                </dd>
                <dd>{formatDeliveryTime(shipping.deliveryTime)}</dd>
              </DescriptionList>
              <DescriptionList
                topline={
                  <em>
                    {finishGroup.materialName}, {finishGroup.name} ({materialConfig.color})
                  </em>
                }
              >
                <dt>Process:</dt>
                <dd>{finishGroup.properties.printingMethodShort}</dd>
                <dt>Produced by:</dt>
                <dd>
                  <ProviderImage
                    inline
                    src={providerImages[multiModelQuote.vendorId]}
                    onClick={event => {
                      event.preventDefault()
                      openProviderModal(multiModelQuote.vendorId)
                    }}
                    alt={getProviderName(multiModelQuote.vendorId)}
                  />
                </dd>
              </DescriptionList>
            </>
          )}
        </OfferCard>
      )
    }

    const renderOfferList = offers => (
      <OfferList
        showMoreAction={
          <Button minor label="See all offers" onClick={() => setShowAllOffers(true)} />
        }
        showMore={showAllOffers}
      >
        {offers.map(({multiModelQuote, shipping, totalGrossPrice}, i) => {
          const materialConfig = materialConfigs[multiModelQuote.materialConfigId]
          const finishGroup = finishGroups[materialConfig.finishGroupId]
          const {productionTimeFast, productionTimeSlow} = materialConfig.printingService[
            multiModelQuote.vendorId
          ]

          return (
            <OfferItem
              key={i}
              actions={
                <Button
                  primary
                  tiny={!breakpoints.tablet}
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
                          materialConfigId: null
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
              }
            >
              {!breakpoints.tablet && (
                <>
                  <DescriptionList
                    topline={
                      <strong className="u-align-right">
                        {formatPrice(totalGrossPrice, multiModelQuote.currency)}
                        &nbsp;&nbsp;&nbsp;
                        {formatTimeRange(
                          productionTimeFast + parseInt(shipping.deliveryTime, 10),
                          productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                        )}
                      </strong>
                    }
                  />
                  <DescriptionList
                    topline={
                      <em>
                        {finishGroup.materialName}, {finishGroup.name} ({materialConfig.color})
                      </em>
                    }
                  >
                    <dt>Process:</dt>
                    <dd>{finishGroup.properties.printingMethodShort}</dd>
                    <dt>Produced by:</dt>
                    <dd>
                      <ProviderImage
                        inline
                        src={providerImages[multiModelQuote.vendorId]}
                        onClick={event => {
                          event.preventDefault()
                          openProviderModal(multiModelQuote.vendorId)
                        }}
                        alt={getProviderName(multiModelQuote.vendorId)}
                      />
                    </dd>
                  </DescriptionList>
                </>
              )}
              {breakpoints.tablet && !breakpoints.bigscreen && (
                <>
                  <DescriptionList doubleValues>
                    <dt>
                      <strong>Price total:</strong>
                    </dt>
                    <dd className="u-align-right">
                      <strong>{formatPrice(totalGrossPrice, multiModelQuote.currency)}</strong>
                    </dd>
                    <dd>
                      <strong>
                        {formatTimeRange(
                          productionTimeFast + parseInt(shipping.deliveryTime, 10),
                          productionTimeSlow + parseInt(shipping.deliveryTime, 10)
                        )}
                      </strong>
                    </dd>
                    <dt>Production:</dt>
                    <dd className="u-align-right">
                      {formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency)}
                    </dd>
                    <dd>{formatTimeRange(productionTimeFast, productionTimeSlow)}</dd>

                    <dt>Shipping:</dt>
                    <dd className="u-align-right">
                      {usedShippingIdsById[shipping.shippingId]
                        ? formatPrice(0, shipping.currency)
                        : formatPrice(shipping.grossPrice, shipping.currency)}
                    </dd>
                    <dd>{formatDeliveryTime(shipping.deliveryTime)}</dd>
                  </DescriptionList>
                </>
              )}
              {breakpoints.bigscreen && (
                <>
                  <DescriptionList>
                    <dt>
                      <strong>Price total:</strong>
                    </dt>
                    <dd className="u-align-right">
                      <strong>{formatPrice(totalGrossPrice, multiModelQuote.currency)}</strong>
                    </dd>
                    <dt>Production:</dt>
                    <dd className="u-align-right">
                      {formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency)}
                    </dd>
                    <dt>Shipping:</dt>
                    <dd className="u-align-right">
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
                      <strong>
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
                  <DescriptionList
                    topline={
                      <em>
                        {finishGroup.materialName}, {finishGroup.name} ({materialConfig.color})
                      </em>
                    }
                  >
                    <dt>Process:</dt>
                    <dd>{finishGroup.properties.printingMethodShort}</dd>
                    <dt>Produced by:</dt>
                    <dd>
                      <ProviderImage
                        inline
                        src={providerImages[multiModelQuote.vendorId]}
                        onClick={event => {
                          event.preventDefault()
                          openProviderModal(multiModelQuote.vendorId)
                        }}
                        alt={getProviderName(multiModelQuote.vendorId)}
                      />
                    </dd>
                  </DescriptionList>
                </>
              )}
            </OfferItem>
          )
        })}
      </OfferList>
    )

    const offers = selectedState.materialId
      ? getBestMultiModelOffers(multiModelQuotes, usedShippingIds, shippings, materialConfigs, {
          materialConfigId: selectedState.materialConfigId,
          finishGroupId: selectedState.finishGroupId,
          materialId: selectedState.materialId
        })
      : []
    const cheapestOffer = offers[0]
    const fastestOffer = [...offers].sort(
      (offer1, offer2) => getDeliveryTime(offer1) - getDeliveryTime(offer2)
    )[0]

    if (offers.length === 0) {
      return null
    }

    return (
      <MaterialStepSection headline={<Headline size="l" light label="4. Select Offer" />} fadeIn>
        <RecommendedOfferSection classNames={['u-margin-bottom-xl']}>
          {renderOfferCard(cheapestOffer, true)}
          {renderOfferCard(fastestOffer)}
        </RecommendedOfferSection>
        {renderOfferList(offers)}
      </MaterialStepSection>
    )
  }

  if (selectedModelConfigs.length === 0) {
    return <Headline label="Select a file to start configuring" size="xl" light />
  }

  return (
    <>
      {renderMaterialSection()}
      <div id="material-step-2">{selectedMaterial && renderFinishSection()}</div>
      <div id="material-step-3">{selectedFinishGroup && renderColorSection()}</div>
      <div id="material-step-4">{selectedMaterialConfig && renderOffersSection()}</div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  modelConfigs: state.core.modelConfigs,
  quotes: selectQuotes(state),
  materialGroups: state.core.materialGroups,
  materials: state.core.materials,
  materialConfigs: state.core.materialConfigs,
  finishGroups: state.core.finishGroups,
  pollingProgress: selectQuotePollingProgress(state),
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  featureFlags: state.core.featureFlags,
  currency: state.core.currency,
  location: state.core.location,
  shippings: state.core.shippings,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  usedShippingIds: selectUsedShippingIdsAndFilter(state, ownProps.configIds),
  quotePollingProgress: selectQuotePollingProgress(state),
  isPollingDone: selectIsPollingDone(state)
})

const mapDispatchToProps = {
  goToCart: navigationAction.goToCart,
  openMaterialModal: modalAction.openMaterialModal,
  openFinishGroupModal: modalAction.openFinishGroupModal,
  openProviderModal: modalAction.openProviderModal,
  receiveQuotes: quoteAction.receiveQuotes,
  goingToReceiveQuotes: quoteAction.goingToReceiveQuotes,
  stopReceivingQuotes: quoteAction.stopReceivingQuotes,
  addToCart: cartAction.addToCart,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('materialFilter', 'setMaterialFilter', ''),
  withState('showAllOffers', 'setShowAllOffers', false),
  withHandlers({
    selectMaterialGroup: ({onChange, setMaterialFilter, setShowAllOffers}) => id => {
      onChange({
        materialGroupId: id,
        materialId: null,
        finishGroupId: null,
        materialConfigId: null
      })
      setMaterialFilter('')
      setShowAllOffers(false)
    },
    selectMaterial: ({onChange, selectedState, scrollContainerId, setShowAllOffers}) => id => {
      onChange({
        ...selectedState,
        materialId: id,
        finishGroupId: null,
        materialConfigId: null
      })
      defer(() => scrollTo('#material-step-2', `#${scrollContainerId}`))
      setShowAllOffers(false)
    },
    selectFinishGroup: ({onChange, selectedState, scrollContainerId, setShowAllOffers}) => id => {
      onChange({
        ...selectedState,
        finishGroupId: id,
        materialConfigId: null
      })
      defer(() => scrollTo('#material-step-3', `#${scrollContainerId}`))
      setShowAllOffers(false)
    },
    selectMaterialConfig: ({onChange, selectedState, scrollContainerId}) => id => {
      onChange({
        ...selectedState,
        materialConfigId: id
      })
      defer(() => scrollTo('#material-step-4', `#${scrollContainerId}`))
    }
  }),
  withProps(({materialGroups, materials, finishGroups, materialConfigs, selectedState}) => ({
    selectedMaterialGroup: materialGroups[selectedState.materialGroupId],
    selectedMaterial: materials[selectedState.materialId],
    selectedFinishGroup: finishGroups[selectedState.finishGroupId],
    selectedMaterialConfig: materialConfigs[selectedState.materialConfigId]
  })),
  withPropsOnChange(['materials'], ({materials}) => ({
    materialSearch: createMaterialSearch(Object.values(materials))
  })),
  withPropsOnChange(['materialFilter', 'materialSearch'], ({materialFilter, materialSearch}) => ({
    filteredMaterials: materialFilter.length > 0 ? materialSearch.search(materialFilter) : undefined
  })),
  withPropsOnChange(
    () => false, // Should never reinitialize the debounce function
    ({receiveQuotes}) => ({
      debouncedReceiveQuotes: debounce(receiveQuotes, config.receiveQuotesWait)
    })
  ),
  lifecycle({
    componentWillMount() {
      // It is possible that we do not have a location yet!
      if (this.props.selectedModelConfigs.length > 0 && this.props.location) {
        const modelConfigs = this.props.selectedModelConfigs
        const {refresh} = this.props.featureFlags
        const currency = this.props.currency
        const {countryCode} = this.props.location

        this.props.receiveQuotes({
          modelConfigs,
          countryCode,
          currency,
          refresh
        })
      }
    },
    componentDidUpdate(prevProps) {
      // Refresh quotes if...
      // - countryCode changed
      // - currency changed
      // - selectedModelConfigs changed
      // - quantities changed
      // - we had no location before
      if (
        this.props.selectedModelConfigs.length > 0 &&
        (this.props.currency !== prevProps.currency ||
          get(this.props.location, 'countryCode') !== get(prevProps.location, 'countryCode') ||
          !isEqual(this.props.selectedModelConfigs, prevProps.selectedModelConfigs))
      ) {
        const modelConfigs = this.props.selectedModelConfigs
        const {refresh} = this.props.featureFlags
        const currency = this.props.currency
        const {countryCode} = this.props.location

        this.props.goingToReceiveQuotes()
        this.props.debouncedReceiveQuotes({
          modelConfigs,
          countryCode,
          currency,
          refresh
        })
      }
    },
    componentWillUnmount() {
      this.props.debouncedReceiveQuotes.cancel()
      this.props.stopReceivingQuotes()
    }
  })
)(MaterialPartial)
