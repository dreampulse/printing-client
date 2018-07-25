// @flow

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withStateHandlers from 'recompose/withStateHandlers'
import withProps from 'recompose/withProps'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import flatten from 'lodash/flatten'
import partition from 'lodash/partition'

import * as navigationAction from '../action-next/navigation'
import * as modalAction from '../action-next/modal'
import * as quoteAction from '../action-next/quote'
import type {AppState} from '../reducer-next'
import {getMaterialById, getMaterialGroupById} from '../lib/material'
import {formatPrice} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {
  selectMaterialGroups,
  selectAllMaterialConfigIds,
  selectModelConfigsByIds,
  selectPollingProgress,
  selectIsPollingDone,
  selectFeatureFlags
} from '../selector'
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

const MaterialPage = ({
  onClosePage,
  materialGroups,
  filteredMaterials,
  selectedMaterialGroup,
  selectedMaterial,
  materialFilter,
  selectMaterialGroup,
  selectMaterial,
  setMaterialFilter,
  onOpenMaterialModal,
  quotes,
  pollingProgress
  // isPollingDone
}) => {
  // TODO: integrate quote into page
  console.log('-- got quotes', quotes)

  const title = 'Choose material (TODO)'
  const numCheckedProviders = pollingProgress.done
  const numTotalProviders = pollingProgress.total

  const renderMaterialCard = material => {
    const bestOffer = null // getBestOfferForMaterial(offers, material)
    const price = (
      <Price
        value={bestOffer ? formatPrice(bestOffer.subTotalPrice, bestOffer.currency) : undefined}
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
        loading={!bestOffer}
        selected={selectedMaterial && selectedMaterial.id === material.id}
        unavailable={
          !bestOffer // &&
          // printingServiceRequests &&
          // printingServiceRequests.complete === printingServiceRequests.total
        }
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

  const renderMaterialSection = () => {
    const materials =
      filteredMaterials ||
      (selectedMaterialGroup && selectedMaterialGroup.materials) ||
      flatten(materialGroups.map(group => group.materials))

    function sortMaterials(unsortedMaterials) {
      const hasOffer = _material => false // Boolean(getBestOfferForMaterial(offers, material))
      const [materialsWithOffers, materialsWithoutOffers] = partition(unsortedMaterials, hasOffer)

      return [...materialsWithOffers, ...materialsWithoutOffers]
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
      <Modal />
    </App>
  )
}

const mapStateToProps = (state: AppState, ownProps) => ({
  quotes: state.quote.quotes,
  materialGroups: selectMaterialGroups(state),
  pollingProgress: selectPollingProgress(state),
  isPollingDone: selectIsPollingDone(state),
  // The next three props are required for the ReceiveQuotes-action
  allMaterialConfigIds: selectAllMaterialConfigIds(state),
  selectedModelConfigs: selectModelConfigsByIds(state, ownProps.configIds),
  featureFlags: selectFeatureFlags(state)
})

const mapDispatchToProps = {
  // TODO: goto upload or cart page depending whether the given models already are in the cart or not
  onClosePage: navigationAction.goToUpload,
  onAbort: navigationAction.goToUpload,
  onOpenMaterialModal: modalAction.openMaterial,
  onReceiveQuotes: quoteAction.receiveQuotes,
  onStopReceivingQuotes: quoteAction.stopReceivingQuotes
}

export default compose(
  withStateHandlers(
    {
      selectedMaterialGroupId: undefined,
      selectedMaterialId: undefined,
      selectedMaterialConfigId: undefined,
      materialFilter: ''
    },
    {
      selectMaterialGroup: () => id => ({
        selectedMaterialGroupId: id,
        selectedMaterialId: undefined,
        selectedMaterialConfigId: undefined,
        materialFilter: ''
      }),
      selectMaterial: () => id => ({
        selectedMaterialId: id,
        selectedMaterialConfigId: undefined
      }),
      selectMaterialConfig: () => id => ({
        selectedMaterialConfigId: id
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
    materialSearch: createMaterialSearch(flatten(materialGroups.map(group => group.materials)))
  })),
  withPropsOnChange(['materialFilter', 'materialSearch'], ({materialFilter, materialSearch}) => ({
    filteredMaterials: materialFilter.length > 0 ? materialSearch.search(materialFilter) : undefined
  })),
  lifecycle({
    componentWillMount() {
      // TODO: This does not work for page refreshes
      if (this.props.configIds.length === 0) {
        this.props.onAbort()
      }

      const modelConfigs = this.props.selectedModelConfigs
      const materialConfigIds = this.props.allMaterialConfigIds
      const {refresh} = this.props.featureFlags
      this.props.onReceiveQuotes({
        modelConfigs,
        materialConfigIds,
        // TODO: connect to the store
        countryCode: 'DE',
        currency: 'EUR',
        refresh
      })
    },
    componentWillUnmount() {
      this.props.onStopReceivingQuotes()
    }
  })
)(MaterialPage)
