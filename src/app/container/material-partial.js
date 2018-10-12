// @flow

import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import flatMap from 'lodash/flatMap'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'

import * as navigationAction from '../action/navigation'
import * as modalAction from '../action/modal'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import type {AppState} from '../reducer'
import {
  getMaterialById,
  getMaterialGroupById,
  getMaterialTreeByMaterialConfigId,
  getProviderName,
  getMaterialConfigById
} from '../lib/material'
import {
  getBestMultiModelOfferForMaterial,
  getBestMultiModelOffersForMaterialConfig,
  isSameOffer
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
import scrollTo from '../service/scroll-to'
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
import SelectField from '../component/select-field'
import SelectMenu from '../component/select-menu'
import ProviderItem from '../component/provider-item'
import ProviderList from '../component/provider-list'
import DescriptionList from '../component/description-list'
import ProviderImage from '../component/provider-image'
import Button from '../component/button'
import ProviderBox from '../component/provider-box'
import Icon from '../component/icon'
import ProviderBoxSection from '../component/provider-box-section'

const MaterialPartial = ({
  selectMaterialConfigForFinishGroup,
  selectedMaterialConfigs,
  materialGroups,
  filteredMaterials,
  selectedMaterialGroup,
  selectedMaterial,
  materialFilter,
  selectMaterialGroup,
  selectMaterial,
  selectedMaterialConfigId,
  selectMaterialConfig,
  setMaterialFilter,
  openMaterialModal,
  openFinishGroupModal,
  addToCart,
  goToAddress,
  quotes,
  selectedModelConfigs,
  shippings,
  isPollingDone,
  configIds,
  uploadedModelConfigs,
  usedShippingIds,
  isUploadPage,
  updateSelectedModelConfigs,
  modelConfigs
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

  const finishSectionEnabled = Boolean(selectedMaterial)
  const providerSectionEnabled = selectedMaterialConfigId && providerList.length > 0

  const hasItemsOnUploadPage = uploadedModelConfigs.some(
    modelConfig => !configIds.find(id => id === modelConfig.id) && !modelConfig.quoteId
  )

  const usedShippingIdsById = keyBy(usedShippingIds, id => id)

  const renderMaterialSection = () => {
    const renderMaterialCard = material => {
      const bestOffer = getBestMultiModelOfferForMaterial(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        material
      )
      const price = (
        <Price
          value={
            bestOffer
              ? formatPrice(bestOffer.totalGrossPrice, bestOffer.multiModelQuote.currency)
              : undefined
          }
          prefix="Total price"
        />
      )

      return (
        <MaterialCard
          key={material.id}
          title={material.name}
          description={material.descriptionShort}
          price={price}
          image={getCloudinaryUrl(material.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestOffer}
          selected={selectedMaterial && selectedMaterial.id === material.id}
          unavailable={!bestOffer && isPollingDone}
          onSelectClick={() => {
            selectMaterial(material.id)
            scrollTo('#section-finish')
          }}
          onMoreClick={() => {
            openMaterialModal(material.id)
          }}
        />
      )
    }

    const materials =
      filteredMaterials ||
      (selectedMaterialGroup && selectedMaterialGroup.materials) ||
      flatMap(materialGroups, group => group.materials)

    const sortMaterials = unsortedMaterials =>
      partitionBy(unsortedMaterials, material =>
        Boolean(
          getBestMultiModelOfferForMaterial(multiModelQuotes, usedShippingIds, shippings, material)
        )
      )

    return (
      <Section>
        <Headline label="1. Select Material" modifiers={['xl']} />
        <Grid>
          <Column lg={8} classNames={['u-margin-bottom']}>
            <RadioButtonGroup
              name="material-group"
              value={(selectedMaterialGroup && selectedMaterialGroup.id) || undefined}
              onChange={selectMaterialGroup}
            >
              <RadioButton key="__ALL__" value={undefined} label="All" />
              {materialGroups.map(group => (
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
        {materials.length > 0 && (
          <MaterialSlider>{sortMaterials(materials).map(renderMaterialCard)}</MaterialSlider>
        )}
        {materials.length === 0 && (
          <Paragraph modifiers={['l']} classNames={['u-align-center']}>
            No materials found.
          </Paragraph>
        )}
      </Section>
    )
  }

  const renderFinishSection = () => {
    const renderFinishCard = finishGroup => {
      const colors = finishGroup.materialConfigs
        // Filter out material configs which do not have an offer
        .filter(materialConfig =>
          Boolean(
            getBestMultiModelOffersForMaterialConfig(
              multiModelQuotes,
              usedShippingIds,
              shippings,
              materialConfig.id
            ).length
          )
        )
        .map(({id, color, colorCode, colorImage}) => ({
          value: id,
          colorValue: colorCode,
          label: color,
          colorImage: colorImage && getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
        }))

      let sortedOffers = getBestMultiModelOffersForMaterialConfig(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        selectedMaterialConfigs[finishGroup.id]
      )
      let selectedColor = colors.find(
        ({value}) =>
          selectedMaterialConfigs[finishGroup.id] !== undefined &&
          value === selectedMaterialConfigs[finishGroup.id]
      )

      // If there is no previous selected config use the first color
      if (!selectedColor) {
        selectedColor = colors.length > 0 && colors[0]
        if (selectedColor) {
          sortedOffers = getBestMultiModelOffersForMaterialConfig(
            multiModelQuotes,
            usedShippingIds,
            shippings,
            selectedColor.value
          )
        }
      }

      const [bestOffer] = sortedOffers

      const colorMenu = colors.length > 1 && <SelectMenu values={colors} />
      const materialPrice = (
        <Price
          value={
            bestOffer && formatPrice(bestOffer.totalGrossPrice, bestOffer.multiModelQuote.currency)
          }
          prefix="Total price"
        />
      )
      const colorSelect = (
        <SelectField
          modifiers={['compact']}
          menu={colorMenu}
          value={selectedColor || null}
          onChange={({value}) => selectMaterialConfigForFinishGroup(value, finishGroup.id)}
        />
      )

      return (
        <MaterialCard
          modifiers={['tall']}
          key={finishGroup.id}
          title={finishGroup.name}
          description={finishGroup.descriptionShort}
          price={materialPrice}
          image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          colorSelect={colorSelect}
          selected={selectedColor && selectedColor.value === selectedMaterialConfigId}
          loading={!bestOffer}
          unavailable={!bestOffer && isPollingDone}
          onSelectClick={
            (selectedColor &&
              (() => {
                selectMaterialConfig(selectedColor && selectedColor.value)
                scrollTo('#section-provider')
              })) ||
            null
          }
          onMoreClick={() => {
            openFinishGroupModal(finishGroup.id)
          }}
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
        <Headline label="2. Select Finish" modifiers={['xl']} />
        {selectedMaterial.finishGroups.length > 0 && (
          <MaterialSlider>
            {sortFinishGroup(selectedMaterial.finishGroups).map(renderFinishCard)}
          </MaterialSlider>
        )}
      </Section>
    )
  }

  const getDeliveryTime = ({multiModelQuote, shipping}) => {
    const materialTree = getMaterialTreeByMaterialConfigId(
      materialGroups,
      multiModelQuote.materialConfigId
    )

    const {productionTimeFast} = materialTree.materialConfig.printingService[
      multiModelQuote.vendorId
    ]

    return productionTimeFast + parseInt(shipping.deliveryTime, 10)
  }

  const getOfferInfos = ({multiModelQuote, shipping, totalGrossPrice}) => {
    const materialTree = getMaterialTreeByMaterialConfigId(
      materialGroups,
      multiModelQuote.materialConfigId
    )

    const {productionTimeFast, productionTimeSlow} = materialTree.materialConfig.printingService[
      multiModelQuote.vendorId
    ]

    const materialName = `${materialTree.material.name}, ${materialTree.finishGroup
      .name} (${materialTree.materialConfig.color})`

    return {
      shippingId: shipping.shippingId,
      materialName,
      process: materialTree.finishGroup.properties.printingMethodShort,
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
      finishImageUrl: getCloudinaryUrl(materialTree.finishGroup.featuredImage, [
        'w_700',
        'h_458',
        'c_fill'
      ]),
      addToCartLabel: hasItemsOnUploadPage ? 'Add to cart' : 'Checkout',
      handleAddToCart: () =>
        addToCart(configIds, multiModelQuote.quotes, shipping).then(() => {
          if (isUploadPage && hasItemsOnUploadPage) {
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
            scrollTo('#root')
          } else {
            goToAddress()
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
        headline={cheapest ? 'Best Price' : 'Express'}
        actionButton={
          <Button icon={checkoutIcon} label={addToCartLabel} onClick={handleAddToCart} />
        }
        image={finishImageUrl}
        day={cheapest ? time : <strong>{time}</strong>}
        price={cheapest ? <strong>{totalPrice}</strong> : totalPrice}
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
        materialColumn={
          <DescriptionList>
            <dt>Material:</dt>
            <dd>{materialName}</dd>
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
        <Headline label="3. Select Offer" modifiers={['xl']} />
        <ProviderBoxSection>
          {renderPromotedOffer({offer: cheapestOffer, cheapest: true})}
          {renderPromotedOffer({offer: fastestOffer, cheapest: false})}
        </ProviderBoxSection>
        <ProviderList>
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
                    <dt>Material:</dt>
                    <dd>{materialName}</dd>
                    <dt>Process:</dt>
                    <dd>{process}</dd>
                  </DescriptionList>
                }
                provider={<ProviderImage modifiers={['s']} name={providerName} slug={vendorId} />}
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
                    modifiers={['minor']}
                    icon={checkoutIcon}
                    label={addToCartLabel}
                    onClick={handleAddToCart}
                  />
                }
              />
            )
          })}
        </ProviderList>
      </Section>
    )
  }

  return (
    <Fragment>
      <div id="section-material">{renderMaterialSection()}</div>
      <div id="section-finish">{finishSectionEnabled && renderFinishSection()}</div>
      <div id="section-provider">{providerSectionEnabled && renderProviderSection()}</div>
    </Fragment>
  )
}

const mapStateToProps = (state: AppState, ownProps) => ({
  modelConfigs: state.core.modelConfigs,
  quotes: selectQuotes(state),
  materialGroups: state.core.materialGroups,
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
  goToAddress: navigationAction.goToAddress,
  openMaterialModal: modalAction.openMaterialModal,
  openFinishGroupModal: modalAction.openFinishGroupModal,
  receiveQuotes: quoteAction.receiveQuotes,
  stopReceivingQuotes: quoteAction.stopReceivingQuotes,
  addToCart: cartAction.addToCart,
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    ({commonMaterialPath}) => ({
      selectedMaterialGroupId: commonMaterialPath.materialGroupId,
      selectedMaterialId: commonMaterialPath.materialId,
      selectedMaterialConfigId: commonMaterialPath.materialConfigId,
      // These are the selected colors in the drop down fields
      selectedMaterialConfigs:
        commonMaterialPath.finishGroupId && commonMaterialPath.materialConfigId
          ? {
              [commonMaterialPath.finishGroupId]: commonMaterialPath.materialConfigId
            }
          : {},
      materialFilter: ''
    }),
    {
      selectMaterialGroup: () => id => ({
        selectedMaterialGroupId: id,
        selectedMaterialId: null,
        selectedMaterialConfigId: null,
        selectedMaterialConfigs: {},
        materialFilter: ''
      }),
      selectMaterial: () => id => ({
        selectedMaterialId: id,
        selectedMaterialConfigId: null,
        selectedMaterialConfigs: {}
      }),
      selectMaterialConfig: () => id => ({
        selectedMaterialConfigId: id
      }),
      selectMaterialConfigForFinishGroup: (
        {selectedMaterialConfigs, selectedMaterialConfigId},
        {materialGroups}
      ) => (materialConfigId, finishGroupId) => {
        const materialConfig = selectedMaterialConfigId
          ? getMaterialConfigById(materialGroups, selectedMaterialConfigId)
          : null
        return {
          // Keep selection if possible
          selectedMaterialConfigId:
            materialConfig && materialConfig.finishGroupId === finishGroupId
              ? materialConfigId
              : null,
          selectedMaterialConfigs: {
            ...selectedMaterialConfigs,
            [finishGroupId]: materialConfigId
          }
        }
      },
      setMaterialFilter: () => materialFilter => ({materialFilter})
    }
  ),
  withProps(({materialGroups, selectedMaterialGroupId, selectedMaterialId}) => ({
    selectedMaterialGroup: getMaterialGroupById(materialGroups, selectedMaterialGroupId),
    selectedMaterial: getMaterialById(materialGroups, selectedMaterialId)
  })),
  withPropsOnChange(['materialGroups'], ({materialGroups}) => ({
    materialSearch: createMaterialSearch(flatMap(materialGroups, group => group.materials))
  })),
  withPropsOnChange(['materialFilter', 'materialSearch'], ({materialFilter, materialSearch}) => ({
    filteredMaterials: materialFilter.length > 0 ? materialSearch.search(materialFilter) : undefined
  })),
  withHandlers({
    receiveQuotes: props => () => {
      const modelConfigs = props.selectedModelConfigs
      const {refresh} = props.featureFlags
      const currency = props.currency
      const {countryCode} = props.location

      props.receiveQuotes({
        modelConfigs,
        countryCode,
        currency,
        refresh
      })
    }
  }),
  lifecycle({
    componentWillMount() {
      // It is possible that we do not have a location yet!
      if (this.props.selectedModelConfigs.length > 0 && this.props.location) {
        this.props.receiveQuotes()
      }
    },
    componentDidUpdate(prevProps) {
      // Refresh quotes if...
      // - countryCode changed
      // - currency changed
      // - configIds changed
      // - quantities changed
      // - we had no location before
      if (
        this.props.selectedModelConfigs.length > 0 &&
        (this.props.currency !== prevProps.currency ||
          get(this.props.location, 'countryCode') !== get(prevProps.location, 'countryCode') ||
          !isEqual(this.props.selectedModelConfigs, prevProps.selectedModelConfigs))
      ) {
        this.props.receiveQuotes()
      }
    },
    componentWillUnmount() {
      this.props.stopReceivingQuotes()
    }
  })
)(MaterialPartial)
