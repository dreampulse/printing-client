// @flow

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import flatMap from 'lodash/flatMap'

import * as navigationAction from '../action-next/navigation'
import * as modalAction from '../action-next/modal'
import * as quoteAction from '../action-next/quote'
import type {AppState} from '../reducer-next'
import {
  getMaterialById,
  getMaterialGroupById,
  getMaterialTreeByMaterialConfigId,
  getProviderName
} from '../lib/material'
import {
  getBestMultiModelQuoteForMaterial,
  getBestMultiModelQuoteForMaterialConfig,
  getMultiModelQuotes
} from '../lib/quote'
import {formatPrice, formatTimeRange, formatDeliveryTime} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {partitionBy} from '../lib/util'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  isQuotePollingDone,
  selectQuotes
} from '../lib/selector'
import {createMaterialSearch} from '../service/search'
import scrollTo from '../service/scroll-to'
import {openIntercom} from '../service/intercom'

import FooterPartial from './footer-partial'
import ConfigurationHeaderPartial from './configuration-header-partial'
import MaterialFilterPartial from './material-filter-partial'
import Modal from './modal'

import App from '../component/app'
import Container from '../component/container'
import OverlayHeaderBar from '../component/overlay-header-bar'
import ProviderProgressBar from '../component/provider-progress-bar'
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

const MaterialPage = ({
  onClosePage,
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
  onOpenMaterialModal,
  onOpenFinishGroupModal,
  quotes,
  selectedModelConfigs,
  shippings,
  pollingProgress,
  isPollingDone
}) => {
  const title = 'Choose material (TODO)'
  const numCheckedProviders = pollingProgress.complete || 0
  const numTotalProviders = pollingProgress.total || 0
  const multiModelQuotes = getMultiModelQuotes(selectedModelConfigs, quotes)

  const renderMaterialSection = () => {
    const renderMaterialCard = material => {
      const bestQuote = getBestMultiModelQuoteForMaterial(multiModelQuotes, material)
      const price = (
        <Price
          value={bestQuote ? formatPrice(bestQuote.price, bestQuote.currency) : undefined}
          prefix="From"
        />
      )

      return (
        <MaterialCard
          key={material.id}
          title={material.name}
          description={material.descriptionShort}
          price={price}
          image={getCloudinaryUrl(material.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestQuote}
          selected={selectedMaterial && selectedMaterial.id === material.id}
          unavailable={!bestQuote && isPollingDone}
          onSelectClick={() => {
            selectMaterial(material.id)
            scrollTo('#section-finish')
          }}
          onMoreClick={() => {
            onOpenMaterialModal(material.id)
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
        Boolean(getBestMultiModelQuoteForMaterial(multiModelQuotes, material))
      )

    return (
      <Section>
        <Headline label="1. Material" modifiers={['xl']} />
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
          Boolean(getBestMultiModelQuoteForMaterialConfig(multiModelQuotes, materialConfig.id))
        )
        .map(({id, color, colorCode, colorImage}) => ({
          value: id,
          colorValue: colorCode,
          label: color,
          colorImage: colorImage && getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
        }))

      let bestQuote = getBestMultiModelQuoteForMaterialConfig(
        multiModelQuotes,
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
          bestQuote = getBestMultiModelQuoteForMaterialConfig(multiModelQuotes, selectedColor.value)
        }
      }

      const colorMenu = colors.length > 1 && <SelectMenu values={colors} />
      const materialPrice = (
        <Price
          value={bestQuote && formatPrice(bestQuote.price, bestQuote.currency)}
          prefix="From"
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
          loading={!bestQuote}
          unavailable={!bestQuote && isPollingDone}
          onSelectClick={
            (selectedColor &&
              (() => {
                selectMaterialConfig(selectedColor && selectedColor.value)
                scrollTo('#section-provider')
              })) ||
            null
          }
          onMoreClick={() => {
            onOpenFinishGroupModal(finishGroup.id)
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
        <Headline label="2. Finish" modifiers={['xl']} />
        {selectedMaterial.finishGroups.length > 0 && (
          <MaterialSlider>
            {sortFinishGroup(selectedMaterial.finishGroups).map(renderFinishCard)}
          </MaterialSlider>
        )}
      </Section>
    )
  }

  const renderProviderSection = () => {
    const multiModelQuotesForSelectedMaterialConfig = multiModelQuotes
      .filter(
        multiModelQuote =>
          multiModelQuote.isPrintable &&
          multiModelQuote.materialConfigId === selectedMaterialConfigId
      )
      .sort((a, b) => b.price - a.price)

    const providerList = flatMap(
      (multiModelQuotesForSelectedMaterialConfig: any), // Because flatMap is broken in flow
      multiModelQuote =>
        shippings
          .filter(shipping => shipping.vendorId === multiModelQuote.vendorId)
          .map(shipping => [multiModelQuote, shipping])
    )

    return (
      <Section>
        <Headline label="3. Provider and shipping" modifiers={['xl']} />
        <ProviderList>
          {providerList.map(([multiModelQuote, shipping]) => {
            const materialTree = getMaterialTreeByMaterialConfigId(
              materialGroups,
              multiModelQuote.materialConfigId
            )

            const process = materialTree.finishGroup.properties.printingMethodShort
            const providerInfo =
              materialTree.finishGroup.properties.printingServiceName[multiModelQuote.vendorId]
            const {
              productionTimeFast,
              productionTimeSlow
            } = materialTree.materialConfig.printingService[multiModelQuote.vendorId]

            // TODO: how to deal with vat? The current prices are without vat
            // TODO: how to deal with shipping if another model with same shipping method has already been added to cart
            const totalPrice = multiModelQuote.price + shipping.price

            return (
              <ProviderItem
                key={multiModelQuote.quoteId + shipping.shippingId}
                process={process}
                providerSlug={multiModelQuote.vendorId}
                providerName={getProviderName(multiModelQuote.vendorId)}
                providerInfo={providerInfo}
                price={formatPrice(multiModelQuote.price, multiModelQuote.currency)}
                deliveryTime={formatDeliveryTime(shipping.deliveryTime)}
                deliveryProvider={shipping.name}
                shippingPrice={formatPrice(shipping.price, shipping.currency)}
                totalPrice={formatPrice(totalPrice, multiModelQuote.currency)}
                includesVat={false}
                productionTime={formatTimeRange(productionTimeFast, productionTimeSlow)}
                onAddToCartClick={() => {
                  console.log('-- TODO Add to cart', multiModelQuote, shipping)
                }}
              />
            )
          })}
        </ProviderList>
      </Section>
    )
  }

  const finishSectionEnabled = Boolean(selectedMaterial)
  const providerSectionEnabled = selectedMaterialConfigId

  return (
    <App
      header={[
        <OverlayHeaderBar key="header-bar" onClickClose={onClosePage} title={title}>
          <ProviderProgressBar currentStep={numCheckedProviders} totalSteps={numTotalProviders} />
        </OverlayHeaderBar>,
        <ConfigurationHeaderPartial key="configuration-header" />
      ]}
      footer={<FooterPartial />}
    >
      <Container>
        <div id="section-material">{renderMaterialSection()}</div>
        <div id="section-finish">{finishSectionEnabled && renderFinishSection()}</div>
        <div id="section-provider">{providerSectionEnabled && renderProviderSection()}</div>
      </Container>
      <Modal />
    </App>
  )
}

const mapStateToProps = (state: AppState, ownProps) => ({
  quotes: selectQuotes(state),
  materialGroups: state.core.materialGroups,
  pollingProgress: selectQuotePollingProgress(state),
  isPollingDone: isQuotePollingDone(state),
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  featureFlags: state.core.featureFlags,
  currency: state.core.currency,
  location: state.core.location,
  shippings: state.core.shippings
})

const mapDispatchToProps = {
  // TODO: goto upload or cart page depending whether the given models already are in the cart or not
  onClosePage: navigationAction.goToUpload,
  onAbort: navigationAction.goToUpload,
  onOpenMaterialModal: modalAction.openMaterial,
  onOpenFinishGroupModal: modalAction.openFinishGroupModal,
  onReceiveQuotes: quoteAction.receiveQuotes,
  onStopReceivingQuotes: quoteAction.stopReceivingQuotes
}

export default compose(
  withStateHandlers(
    {
      selectedMaterialGroupId: undefined,
      selectedMaterialId: undefined,
      selectedMaterialConfigId: undefined,
      selectedMaterialConfigs: {}, // This is the selected color
      materialFilter: ''
    },
    {
      selectMaterialGroup: () => id => ({
        selectedMaterialGroupId: id,
        selectedMaterialId: undefined,
        selectedMaterialConfigId: undefined,
        selectedMaterialConfigs: {},
        materialFilter: ''
      }),
      selectMaterial: () => id => ({
        selectedMaterialId: id,
        selectedMaterialConfigId: undefined,
        selectedMaterialConfigs: {}
      }),
      selectMaterialConfig: () => id => ({
        selectedMaterialConfigId: id
      }),
      selectMaterialConfigForFinishGroup: ({selectedMaterialConfigs}) => (
        materialConfigId,
        finishGroupId
      ) => ({
        selectedMaterialConfigs: {
          ...selectedMaterialConfigs,
          [finishGroupId]: materialConfigId
        }
      }),
      setMaterialFilter: () => materialFilter => ({materialFilter})
    }
  ),
  withProps(({location}) => ({
    configIds: (location.state && location.state.configIds) || []
  })),
  connect(mapStateToProps, mapDispatchToProps),
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
      props.onReceiveQuotes({
        modelConfigs,
        countryCode,
        currency,
        refresh
      })
    }
  }),
  lifecycle({
    componentWillMount() {
      if (this.props.selectedModelConfigs.length === 0) {
        this.props.onAbort()
        return
      }

      this.props.receiveQuotes()
    },
    componentDidUpdate(prevProps) {
      // Refresh quotes if countryCode or currency changed
      if (
        this.props.currency !== prevProps.currency ||
        this.props.location.countryCode !== prevProps.location.countryCode
      ) {
        this.props.receiveQuotes()
      }
    },
    componentWillUnmount() {
      this.props.onStopReceivingQuotes()
    }
  })
)(MaterialPage)
