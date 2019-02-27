import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import compact from 'lodash/compact'
import debounce from 'lodash/debounce'

import * as modalAction from '../action/modal'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getProviderName} from '../lib/material'
import {
  getBestMultiModelOfferForMaterial,
  getBestMultiModelOffersForMaterialConfig,
  isSameOffer,
  getBestMultiModelOfferForFinishGroup,
  getBestMultiModelOfferForMaterialConfig
} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice, formatTimeRange, formatDeliveryTime} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {partitionBy} from '../lib/util'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  isQuotePollingDone,
  selectQuotes,
  selectUploadedModelConfigs,
  selectCommonMaterialPathOfModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'
import {createMaterialSearch} from '../service/search'
import {openIntercom} from '../service/intercom'
import checkoutIcon from '../../asset/icon/checkout.svg'
import fastestIcon from '../../asset/icon/fastest.svg'
import cheapestIcon from '../../asset/icon/cheapest.svg'

import MaterialFilterPartial from './material-filter-partial'

import Section from '../component/section'
import Grid from '../component/grid'
import Column from '../component/column'
import Headline from '../component/headline'
import MaterialCard from '../component/material-card'
import Price from '../component/price'
import RadioButton from '../component/radio-button'
import RadioButtonGroup from '../component/radio-button-group'
import MaterialSlider from '../component/material-slider'
import Paragraph from '../component/paragraph'
import Link from '../component/link'
import ProviderItem from '../component/provider-item'
import ProviderList from '../component/provider-list'
import DescriptionList from '../component/description-list'
import ProviderImage from '../component/provider-image'
import Button from '../component/button'
import ProviderBox from '../component/provider-box'
import Icon from '../component/icon'
import ProviderBoxSection from '../component/provider-box-section'
import LoadingCheckmark from '../component/loading-checkmark'
import ColorCard from '../component/color-card'
import ColorTrait from '../component/color-trait'
import ColorCardList from '../component/color-card-list'
import MaterialStepHeadline from '../component/material-step-headline'

const SELECTED_STEP = {
  MATERIAL: 'material',
  FINISH: 'finish',
  COLOR: 'color',
  PROVIDER: 'provider' // Can be removed of the footer is ready
}

const MaterialPartial = ({
  materialGroups,
  materials,
  materialConfigs,
  finishGroups,
  filteredMaterials,
  selectedMaterialGroup,
  selectedMaterial,
  materialFilter,
  selectMaterialGroup,
  selectMaterial,
  selectedMaterialConfigId,
  selectMaterialConfig,
  selectedMaterialConfig,
  selectedFinishGroup,
  selectFinishGroup,
  setMaterialFilter,
  openMaterialModal,
  openFinishGroupModal,
  addToCart,
  goToCart,
  quotes,
  selectedModelConfigs,
  shippings,
  isPollingDone,
  configIds,
  uploadedModelConfigs,
  usedShippingIds,
  isEditMode,
  modelConfigs,
  setProviderListHidden,
  isProviderListHidden,
  pollingProgress,
  goToReviewOrder,
  selectedStep,
  setSelectedStep,
  updateSelectedModelConfigs,
  resetConfigurationState,
  scrollContainerId
}) => {
  const isPollingComplete = pollingProgress.complete === pollingProgress.total
  const hasMoreThanOneResult = pollingProgress.complete > 0

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

  const finishSectionEnabled = Boolean(selectedMaterial)
  const colorSectionEnabled = Boolean(selectedFinishGroup)
  const providerSectionEnabled = selectedMaterialConfigId && providerList.length > 0

  const hasItemsOnUploadPage = uploadedModelConfigs.some(
    modelConfig => !configIds.find(id => id === modelConfig.id) && !modelConfig.quoteId
  )

  const usedShippingIdsById = keyBy(usedShippingIds, id => id)

  const getPrice = offer => (
    <Price
      value={offer ? formatPrice(offer.totalGrossPrice, offer.multiModelQuote.currency) : undefined}
      loadingCheckmark={
        <LoadingCheckmark
          modifiers={compact([
            isPollingComplete && 'done',
            hasMoreThanOneResult && 'hideWithDelay'
          ])}
        />
      }
    />
  )

  const renderMaterialSection = () => {
    const renderMaterialCard = material => {
      const bestOffer = getBestMultiModelOfferForMaterial(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        material
      )

      return (
        <MaterialCard
          key={material.id}
          title={material.name}
          description={material.descriptionShort}
          price={getPrice(bestOffer)}
          image={getCloudinaryUrl(material.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestOffer}
          unavailable={!bestOffer && isPollingDone}
          onSelectClick={() => {
            selectMaterial(material.id)
            setSelectedStep(SELECTED_STEP.FINISH)
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
      partitionBy(unsortedMaterials, material =>
        Boolean(
          getBestMultiModelOfferForMaterial(multiModelQuotes, usedShippingIds, shippings, material)
        )
      )

    return (
      <Section>
        {selectedStep === SELECTED_STEP.MATERIAL ? (
          <>
            <MaterialStepHeadline number="1">Material</MaterialStepHeadline>
            <Grid>
              <Column lg={8} classNames={['u-margin-bottom']}>
                <RadioButtonGroup
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
                <Paragraph classNames={['u-no-margin', 'u-align-right']}>
                  {'Not printable? '}
                  <Link
                    onClick={event => {
                      event.preventDefault()
                      openIntercom()
                    }}
                    label="Contact us"
                  />
                  {' and let’s help you!'}
                </Paragraph>
              </Column>
            </Grid>
            {showMaterials.length > 0 && (
              <MaterialSlider>
                {sortMaterials(showMaterials).map(renderMaterialCard)}
              </MaterialSlider>
            )}
            {showMaterials.length === 0 && (
              <Paragraph modifiers={['l']} classNames={['u-align-center']}>
                No materials found.
              </Paragraph>
            )}
          </>
        ) : (
          <MaterialStepHeadline
            number="1"
            selected={selectedMaterial.name}
            change={
              <Link
                label="change"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setSelectedStep(SELECTED_STEP.MATERIAL)
                }}
              />
            }
          >
            Material
          </MaterialStepHeadline>
        )}
      </Section>
    )
  }

  const renderFinishSection = () => {
    const renderFinishCard = finishGroup => {
      const bestOffer = getBestMultiModelOfferForFinishGroup(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        finishGroup
      )

      return (
        <MaterialCard
          key={finishGroup.id}
          title={finishGroup.name}
          description={finishGroup.descriptionShort}
          price={getPrice(bestOffer)}
          image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestOffer}
          unavailable={!bestOffer && isPollingDone}
          onSelectClick={() => {
            selectFinishGroup(finishGroup.id)
            setSelectedStep(SELECTED_STEP.COLOR)
          }}
          onMoreClick={() => {
            openFinishGroupModal(finishGroup.id)
          }}
          onUnavailableClick={() => openIntercom()}
        />
      )
    }

    const sortFinishGroup = unsortedFinishGroups =>
      partitionBy(unsortedFinishGroups, finishGroup =>
        finishGroup.materialConfigs.some(materialConfig =>
          multiModelQuotes.some(quote => quote.materialConfigId === materialConfig.id)
        )
      )

    return (
      <Section>
        {selectedStep === SELECTED_STEP.FINISH ? (
          <>
            <MaterialStepHeadline number="2">Finish</MaterialStepHeadline>
            {selectedMaterial.finishGroups.length > 0 && (
              <MaterialSlider>
                {sortFinishGroup(selectedMaterial.finishGroups).map(renderFinishCard)}
              </MaterialSlider>
            )}
          </>
        ) : (
          <MaterialStepHeadline
            number="2"
            selected={selectedFinishGroup.name}
            change={
              <Link
                label="change"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setSelectedStep(SELECTED_STEP.FINISH)
                }}
              />
            }
          >
            Finish
          </MaterialStepHeadline>
        )}
      </Section>
    )
  }

  const renderColorSection = () => {
    const renderColorCard = materialConfig => {
      const bestOffer = getBestMultiModelOfferForMaterialConfig(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfig
      )

      return (
        <ColorCard
          colorTrait={
            <ColorTrait
              color={materialConfig.colorCode}
              image={
                materialConfig.colorImage &&
                getCloudinaryUrl(materialConfig.colorImage, ['w_40', 'h_40', 'c_fill'])
              }
            />
          }
          title={materialConfig.color}
          price={getPrice(bestOffer)}
          button={
            <Button
              label="Select"
              minor
              tiny
              onClick={() => {
                selectMaterialConfig(materialConfig.id)
                setSelectedStep(SELECTED_STEP.PROVIDER)
              }}
            />
          }
        />
      )
    }

    return (
      <Section>
        {selectedStep === SELECTED_STEP.COLOR ? (
          <>
            <MaterialStepHeadline number="3">Color</MaterialStepHeadline>
            <ColorCardList>
              {selectedFinishGroup.materialConfigs.map(renderColorCard)}
            </ColorCardList>
          </>
        ) : (
          <MaterialStepHeadline
            number="3"
            selected={selectedMaterialConfig.color}
            change={
              <Link
                label="change"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setSelectedStep(SELECTED_STEP.COLOR)
                }}
              />
            }
          >
            Color
          </MaterialStepHeadline>
        )}
      </Section>
    )
  }

  const getDeliveryTime = ({multiModelQuote, shipping}) => {
    const {productionTimeFast} = materialConfigs[multiModelQuote.materialConfigId].printingService[
      multiModelQuote.vendorId
    ]

    return productionTimeFast + parseInt(shipping.deliveryTime, 10)
  }

  const getOfferInfos = ({multiModelQuote, shipping, totalGrossPrice}) => {
    const materialConfig = materialConfigs[multiModelQuote.materialConfigId]
    const material = materials[materialConfig.materialId]
    const finishGroup = finishGroups[materialConfig.finishGroupId]

    const {productionTimeFast, productionTimeSlow} = materialConfig.printingService[
      multiModelQuote.vendorId
    ]

    const materialName = `${material.name}, ${finishGroup.name} (${materialConfig.color})`

    return {
      shippingId: shipping.shippingId,
      materialName,
      process: finishGroup.properties.printingMethodShort,
      providerName: getProviderName(multiModelQuote.vendorId),
      vendorId: multiModelQuote.vendorId,
      productionTime: formatTimeRange(productionTimeFast, productionTimeSlow),
      deliveryTime: formatDeliveryTime(shipping.deliveryTime),
      time: formatTimeRange(
        productionTimeFast + parseInt(shipping.deliveryTime, 10),
        productionTimeSlow + parseInt(shipping.deliveryTime, 10)
      ),
      productionPrice: formatPrice(multiModelQuote.grossPrice, multiModelQuote.currency),
      shippingPrice: usedShippingIdsById[shipping.shippingId]
        ? formatPrice(0, shipping.currency)
        : formatPrice(shipping.grossPrice, shipping.currency),
      totalPrice: formatPrice(totalGrossPrice, multiModelQuote.currency),
      finishImageUrl: getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill']),
      addToCartLabel: isEditMode ? 'Select offer' : 'Add to cart',
      handleAddToCart: () =>
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
  }

  const renderPromotedOffer = ({offer, cheapest}) => {
    const {
      materialName,
      process,
      providerName,
      productionTime,
      deliveryTime,
      time,
      productionPrice,
      shippingPrice,
      totalPrice,
      finishImageUrl,
      addToCartLabel,
      handleAddToCart,
      vendorId
    } = getOfferInfos(offer)

    return (
      <ProviderBox
        icon={<Icon source={cheapest ? cheapestIcon : fastestIcon} />}
        headline={cheapest ? `Best Price: ${totalPrice}` : `Fastest: ${time}`}
        actionButton={
          <Button icon={checkoutIcon} label={addToCartLabel} onClick={handleAddToCart} />
        }
        image={finishImageUrl}
        day={time}
        price={totalPrice}
        daysColumn={
          <DescriptionList>
            <dt>Production:</dt>
            <dd>{productionTime}</dd>
            <dt>Shipping:</dt>
            <dd>{deliveryTime}</dd>
          </DescriptionList>
        }
        priceColumn={
          <DescriptionList>
            <dt>Production:</dt>
            <dd>{productionPrice}</dd>
            <dt>Shipping:</dt>
            <dd>{shippingPrice}</dd>
          </DescriptionList>
        }
        material={materialName}
        materialColumn={
          <DescriptionList>
            <dt>Process:</dt>
            <dd>{process}</dd>
            <dt>Fulfilled by:</dt>
            <dd>{<ProviderImage modifiers={['xs']} name={providerName} slug={vendorId} />}</dd>
          </DescriptionList>
        }
      />
    )
  }

  const renderProviderSection = () => {
    const cheapestOffer = providerList[0]
    const fastestOffer = [...providerList].sort(
      (offer1, offer2) => getDeliveryTime(offer1) - getDeliveryTime(offer2)
    )[0]

    return (
      <Section>
        {selectedStep === SELECTED_STEP.PROVIDER ? (
          <>
            <MaterialStepHeadline number="4">Offer</MaterialStepHeadline>
            <ProviderBoxSection>
              {renderPromotedOffer({offer: cheapestOffer, cheapest: true})}
              {renderPromotedOffer({offer: fastestOffer, cheapest: false})}
            </ProviderBoxSection>
            <ProviderList
              modifiers={isProviderListHidden ? ['hidden'] : []}
              onShowOffers={() => setProviderListHidden(false)}
            >
              {providerList.map(offer => {
                const {
                  shippingId,
                  materialName,
                  process,
                  providerName,
                  vendorId,
                  productionTime,
                  deliveryTime,
                  time,
                  productionPrice,
                  shippingPrice,
                  totalPrice,
                  addToCartLabel,
                  handleAddToCart
                } = getOfferInfos(offer)

                const isCheapestOffer = isSameOffer(offer, cheapestOffer)
                const isFastestOffer = isSameOffer(offer, fastestOffer)

                return (
                  <ProviderItem
                    key={shippingId}
                    providerAnnotation={
                      <DescriptionList>
                        <dt>Process:</dt>
                        <dd>{process}</dd>
                        <dt>Fulfilled by:</dt>
                        <dd>
                          {<ProviderImage modifiers={['xs']} name={providerName} slug={vendorId} />}
                        </dd>
                      </DescriptionList>
                    }
                    provider={materialName}
                    timeAnnotation={
                      <DescriptionList>
                        <dt>Production:</dt>
                        <dd>{productionTime}</dd>
                        <dt>Shipping:</dt>
                        <dd>{deliveryTime}</dd>
                      </DescriptionList>
                    }
                    time={isFastestOffer ? <strong>{time}</strong> : time}
                    priceAnnotation={
                      <DescriptionList>
                        <dt>Production:</dt>
                        <dd>{productionPrice}</dd>
                        <dt>Shipping:</dt>
                        <dd>{shippingPrice}</dd>
                      </DescriptionList>
                    }
                    price={isCheapestOffer ? <strong>{totalPrice}</strong> : totalPrice}
                    action={
                      <Button
                        icon={checkoutIcon}
                        label={addToCartLabel}
                        onClick={handleAddToCart}
                      />
                    }
                  />
                )
              })}
            </ProviderList>
          </>
        ) : (
          <>
            <MaterialStepHeadline
              number="4"
              selected="(Provider)"
              change={
                <Link
                  label="change"
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    setSelectedStep(SELECTED_STEP.PROVIDER)
                  }}
                />
              }
            >
              Offer
            </MaterialStepHeadline>
          </>
        )}
      </Section>
    )
  }

  if (selectedModelConfigs.length === 0) {
    return (
      <>
        <Headline label="Select a file to start customizing" modifiers={['xl']} />
        {/* TODO: still show headlines for steps 1. 2. 3. here but disabled and without the content */}
      </>
    )
  }

  // TODO: support this

  return (
    <>
      <Headline label="Customize your selection" modifiers={['xl']} />
      <>{renderMaterialSection()}</>
      <>{finishSectionEnabled && renderFinishSection()}</>
      <>{colorSectionEnabled && renderColorSection()}</>
      <>{providerSectionEnabled && renderProviderSection()}</>
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
  withStateHandlers(
    ({commonMaterialPath}) => ({
      selectedMaterialGroupId: commonMaterialPath.materialGroupId,
      selectedMaterialId: commonMaterialPath.materialId,
      selectedFinishGroupId: commonMaterialPath.finishGroupId,
      selectedMaterialConfigId: commonMaterialPath.materialConfigId,
      materialFilter: ''
    }),
    {
      selectMaterialGroup: () => id => ({
        selectedMaterialGroupId: id,
        selectedMaterialId: null,
        selectedFinishGroupId: null,
        selectedMaterialConfigId: null,
        materialFilter: ''
      }),
      selectMaterial: () => id => ({
        selectedMaterialId: id,
        selectedFinishGroupId: null,
        selectedMaterialConfigId: null
      }),
      selectFinishGroup: () => id => ({
        selectedFinishGroupId: id,
        selectedMaterialConfigId: null
      }),
      selectMaterialConfig: () => id => ({
        selectedMaterialConfigId: id
      }),
      setMaterialFilter: () => materialFilter => ({materialFilter}),
      resetConfigurationState: () => () => ({
        selectedMaterialGroupId: null,
        selectedMaterialId: null,
        selectedFinishGroupId: null,
        selectedMaterialConfigId: null
      })
    }
  ),
  withProps(
    ({
      materialGroups,
      materials,
      finishGroups,
      materialConfigs,
      selectedMaterialGroupId,
      selectedMaterialId,
      selectedFinishGroupId,
      selectedMaterialConfigId
    }) => ({
      selectedMaterialGroup: materialGroups[selectedMaterialGroupId],
      selectedMaterial: materials[selectedMaterialId],
      selectedFinishGroup: finishGroups[selectedFinishGroupId],
      selectedMaterialConfig: materialConfigs[selectedMaterialConfigId]
    })
  ),
  withPropsOnChange(['materials'], ({materials}) => ({
    materialSearch: createMaterialSearch(Object.values(materials))
  })),
  withPropsOnChange(['materialFilter', 'materialSearch'], ({materialFilter, materialSearch}) => ({
    filteredMaterials: materialFilter.length > 0 ? materialSearch.search(materialFilter) : undefined
  })),
  withPropsOnChange(
    () => false, // Should never reinitialize the debounce function
    ({receiveQuotes}) => ({
      debouncedReceiveQuotes: debounce(receiveQuotes, 1000)
    })
  ),
  withState('isProviderListHidden', 'setProviderListHidden', true),
  withState('selectedStep', 'setSelectedStep', props =>
    // All closed for edit mode
    props.selectedMaterialId ? null : SELECTED_STEP.MATERIAL
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
