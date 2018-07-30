// @flow

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import flatMap from 'lodash/flatMap'
import partition from 'lodash/partition'

import * as navigationAction from '../action-next/navigation'
import * as modalAction from '../action-next/modal'
import * as quoteAction from '../action-next/quote'
import type {AppState} from '../reducer-next'
import {
  getMaterialById,
  getMaterialGroupById,
  getBestQuoteForMaterial,
  getBestQuoteForMaterialConfig,
  getMaterialTreeByMaterialConfigId,
  getProviderName
} from '../lib/material'
import {formatPrice, formatTimeRange} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  isQuotePollingDone,
  selectQuotes
} from '../lib/selector'
import {buildClassArray} from '../lib/build-class-name'
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
  pollingProgress,
  isPollingDone
}) => {
  const title = 'Choose material (TODO)'
  const numCheckedProviders = pollingProgress.complete
  const numTotalProviders = pollingProgress.total

  const renderMaterialSection = () => {
    const renderMaterialCard = material => {
      const bestQuote = getBestQuoteForMaterial(quotes, material)
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

    function sortMaterials(unsortedMaterials) {
      const hasQuote = material => Boolean(getBestQuoteForMaterial(quotes, material))
      const [materialsWithQuotes, materialsWithoutQuotes] = partition(unsortedMaterials, hasQuote)

      return [...materialsWithQuotes, ...materialsWithoutQuotes]
    }

    return (
      <Section id="section-material">
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
    const disabled = !selectedMaterial
    const headlineModifiers = buildClassArray({
      xl: true,
      disabled
    })

    const renderFinishCard = finishGroup => {
      const colors = finishGroup.materialConfigs
        // Filter out material configs which do not have an offer
        .filter(materialConfig => Boolean(getBestQuoteForMaterialConfig(quotes, materialConfig.id)))
        .map(({id, color, colorCode, colorImage}) => ({
          value: id,
          colorValue: colorCode,
          label: color,
          colorImage: colorImage && getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
        }))

      let bestQuote = getBestQuoteForMaterialConfig(quotes, selectedMaterialConfigs[finishGroup.id])
      let selectedColor = colors.find(
        ({value}) =>
          selectedMaterialConfigs[finishGroup.id] !== undefined &&
          value === selectedMaterialConfigs[finishGroup.id]
      )

      // If there is no previous selected config use the first color
      if (!selectedColor) {
        selectedColor = colors.length > 0 && colors[0]
        if (selectedColor) {
          bestQuote = getBestQuoteForMaterialConfig(quotes, selectedColor.value)
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
          value={selectedColor}
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
            selectedColor &&
            (() => {
              selectMaterialConfig(selectedColor && selectedColor.value)
              scrollTo('#section-provider')
            })
          }
          onMoreClick={() => {
            onOpenFinishGroupModal(finishGroup.id)
          }}
        />
      )
    }

    const sortFinishGroup = unsortedFinishGroups => {
      const hasQuote = finishGroup =>
        finishGroup.materialConfigs.some(materialConfig =>
          quotes.some(quote => quote.materialConfigId === materialConfig.id)
        )
      const [finishGroupWithOffers, finishGroupWithoutOffers] = partition(
        unsortedFinishGroups,
        hasQuote
      )

      return [...finishGroupWithOffers, ...finishGroupWithoutOffers]
    }

    return (
      <Section id="section-finish">
        <Headline label="2. Finish" modifiers={headlineModifiers} />
        {!disabled &&
          selectedMaterial.finishGroups.length > 0 && (
            <MaterialSlider>
              {sortFinishGroup(selectedMaterial.finishGroups).map(renderFinishCard)}
            </MaterialSlider>
          )}
      </Section>
    )
  }

  const renderProviderSection = () => {
    const quotesForSelectedMaterialConfig = quotes.filter(
      quote => quote.isPrintable && quote.materialConfigId === selectedMaterialConfigId
    )

    const disabled = !selectedMaterialConfigId || !quotesForSelectedMaterialConfig
    const headlineModifiers = buildClassArray({
      xl: true,
      disabled
    })

    const getQuoteProcess = quote => {
      const {finishGroup} = getMaterialTreeByMaterialConfigId(
        materialGroups,
        quote.materialConfigId
      )
      return finishGroup.properties.printingMethodShort
    }

    const getProviderInfo = quote => {
      const {finishGroup} = getMaterialTreeByMaterialConfigId(
        materialGroups,
        quote.materialConfigId
      )
      return finishGroup.properties.printingServiceName[quote.vendorId]
    }

    const getProductionTime = quote => {
      const {materialConfig} = getMaterialTreeByMaterialConfigId(
        materialGroups,
        quote.materialConfigId
      )
      const {productionTimeFast, productionTimeSlow} = materialConfig.printingService[
        quote.vendorId
      ]
      return [productionTimeFast, productionTimeSlow]
    }

    // TODO: add shipping-prices
    // TODO: how to deal with vat? The price object is without vat and amount
    const renderProviderList = () => (
      <ProviderList>
        {quotesForSelectedMaterialConfig.sort((a, b) => a.price > b.price).map(quote => (
          <ProviderItem
            key={quote.quoteId}
            process={getQuoteProcess(quote)}
            providerSlug={quote.vendorId}
            providerName={getProviderName(quote.vendorId)}
            providerInfo={getProviderInfo(quote)}
            price={formatPrice(quote.price, quote.currency)}
            deliveryTime={null /* formatDeliveryTime(offer.shipping.deliveryTime) */}
            deliveryProvider={null /* offer.shipping.name */}
            shippingPrice={null /* formatPrice(offer.shipping.price, offer.currency) */}
            totalPrice={null /* formatPrice(offer.totalPrice, offer.currency) */}
            includesVat={false}
            productionTime={formatTimeRange(...getProductionTime(quote))}
            onCheckoutClick={() => {
              console.log('-- TODO Add to cart', quote)
            }}
          />
        ))}
      </ProviderList>
    )

    return (
      <Section id="section-provider">
        <Headline label="3. Choose a provider and shipping option" modifiers={headlineModifiers} />
        {!disabled && renderProviderList()}
      </Section>
    )
  }

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
      <Container>{renderMaterialSection()}</Container>
      <Container>{renderFinishSection()}</Container>
      <Container>{renderProviderSection()}</Container>
      <Modal />
    </App>
  )
}

const mapStateToProps = (state: AppState, ownProps) => ({
  quotes: selectQuotes(state),
  materialGroups: state.core.materialGroups,
  pollingProgress: selectQuotePollingProgress(state),
  isPollingDone: isQuotePollingDone(state),
  // The next two props are required for the ReceiveQuotes-action
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  featureFlags: state.core.featureFlags
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
      selectedMaterialConfigs: {}, // This are the selected "colors"
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
  lifecycle({
    componentWillMount() {
      if (this.props.selectedModelConfigs.length === 0) {
        this.props.onAbort()
        return
      }

      const modelConfigs = this.props.selectedModelConfigs
      const {refresh} = this.props.featureFlags
      this.props.onReceiveQuotes({
        modelConfigs,
        // TODO: connect to the store
        countryCode: 'DE',
        currency: 'EUR',
        refresh
      })
    },
    componentDidUpdate(/* prevProps */) {
      // TODO: Check if countryCode or currency changed -> refresh quoted
    },
    componentWillUnmount() {
      this.props.onStopReceivingQuotes()
    }
  })
)(MaterialPage)
