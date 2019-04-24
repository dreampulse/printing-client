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
import compact from 'lodash/compact'
import debounce from 'lodash/debounce'

import * as modalAction from '../action/modal'
import * as quoteAction from '../action/quote'
import * as cartAction from '../action/cart'
import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getBestMultiModelOffers} from '../lib/offer'
import {getMultiModelQuotes} from '../lib/quote'
import {formatPrice, formatPriceDifference} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'
import {partitionBy} from '../lib/util'
import {
  selectModelConfigsByIds,
  selectQuotePollingProgress,
  isQuotePollingDone,
  selectQuotes,
  selectUploadedModelConfigs,
  selectUsedShippingIdsAndFilter
} from '../lib/selector'
import {createMaterialSearch} from '../service/search'
import {openIntercom} from '../service/intercom'

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
import Button from '../component/button'
import LoadingCheckmark from '../component/loading-checkmark'
import ColorCard from '../component/color-card'
import ColorTrait from '../component/color-trait'
import ColorCardList from '../component/color-card-list'
import MaterialStepSection from '../component/material-step-section'

export const SELECTED_STEP = {
  MATERIAL: 'material',
  FINISH: 'finish',
  COLOR: 'color'
}

const MaterialPartial = ({
  // Own props
  selectedState,
  // HOC props
  materialGroups,
  materials,
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
  quotes,
  selectedModelConfigs,
  shippings,
  isPollingDone,
  usedShippingIds,
  pollingProgress,
  selectStep,
  selectNextStep
}) => {
  const isPollingComplete = pollingProgress.complete === pollingProgress.total
  const hasMoreThanOneResult = pollingProgress.complete > 0

  // Filter out quotes which do not have a valid shipping method
  const validQuotes = quotes.filter(quote =>
    shippings.some(shipping => shipping.vendorId === quote.vendorId)
  )
  const multiModelQuotes = getMultiModelQuotes(selectedModelConfigs, validQuotes)

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
          <LoadingCheckmark
            modifiers={compact([
              isPollingComplete && 'done',
              hasMoreThanOneResult && 'hideWithDelay'
            ])}
          />
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
          key={material.id}
          title={material.name}
          description={material.descriptionShort}
          descriptionHeadline="Best used for:"
          price={renderPrice(bestOffer)}
          image={getCloudinaryUrl(material.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!isPollingDone}
          unavailable={!bestOffer && isPollingDone}
          selectLabel={!bestOffer && isPollingDone ? 'Contact us' : 'Select'}
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
      <Section key="material-section">
        <MaterialStepSection
          number="1"
          selected={selectedMaterial ? selectedMaterial.name : null}
          label="Material"
          open={selectedState.step === SELECTED_STEP.MATERIAL}
          action={
            selectedState.step === SELECTED_STEP.MATERIAL ? (
              <Link
                label="cancel"
                onClick={e => {
                  e.preventDefault()
                  selectNextStep()
                }}
              />
            ) : (
              <Link
                label="change"
                onClick={e => {
                  e.preventDefault()
                  selectStep(SELECTED_STEP.MATERIAL)
                }}
              />
            )
          }
        >
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
            <Paragraph modifiers={['l']} classNames={['u-align-center']}>
              No materials found.
            </Paragraph>
          )}
        </MaterialStepSection>
      </Section>
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

    const renderFinishCard = finishGroup => {
      const [bestOffer] = getBestMultiModelOffers(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfigs,
        {
          finishGroupId: finishGroup.id
        }
      )

      return (
        <MaterialCard
          key={finishGroup.id}
          title={finishGroup.name}
          description={finishGroup.descriptionShort}
          price={renderPrice(bestOffer, compareOffer)}
          image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
          loading={!bestOffer}
          unavailable={!bestOffer && isPollingDone}
          onSelectClick={() => {
            selectFinishGroup(finishGroup.id)
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
      <Section key="finish-section">
        <MaterialStepSection
          number="2"
          selected={selectedFinishGroup ? selectedFinishGroup.name : null}
          label="Finish"
          open={selectedState.step === SELECTED_STEP.FINISH}
          action={
            selectedState.step === SELECTED_STEP.FINISH ? (
              <Link
                label="cancel"
                onClick={e => {
                  e.preventDefault()
                  selectNextStep()
                }}
              />
            ) : (
              <Link
                label="change"
                onClick={e => {
                  e.preventDefault()
                  selectStep(SELECTED_STEP.FINISH)
                }}
              />
            )
          }
        >
          <MaterialSlider>
            {selectedState.step === SELECTED_STEP.FINISH &&
              selectedMaterial &&
              selectedMaterial.finishGroups.length > 0 &&
              sortFinishGroup(selectedMaterial.finishGroups).map(renderFinishCard)}
          </MaterialSlider>
        </MaterialStepSection>
      </Section>
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

    const renderColorCard = materialConfig => {
      const [bestOffer] = getBestMultiModelOffers(
        multiModelQuotes,
        usedShippingIds,
        shippings,
        materialConfigs,
        {
          materialConfigId: materialConfig.id
        }
      )

      return (
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
          button={
            <Button
              label="Select"
              minor
              tiny
              disabled={!bestOffer}
              onClick={() => {
                selectMaterialConfig(materialConfig.id)
              }}
            />
          }
        />
      )
    }

    return (
      <Section key="color-section">
        <MaterialStepSection
          number="3"
          selected={selectedMaterialConfig ? selectedMaterialConfig.color : null}
          label="Color"
          open={selectedState.step === SELECTED_STEP.COLOR}
          action={
            selectedState.step === SELECTED_STEP.COLOR ? (
              <Link
                label="cancel"
                onClick={e => {
                  e.preventDefault()
                  selectStep('')
                }}
              />
            ) : (
              <Link
                label="change"
                onClick={e => {
                  e.preventDefault()
                  selectStep(SELECTED_STEP.COLOR)
                }}
              />
            )
          }
        >
          {selectedState.step === SELECTED_STEP.COLOR && selectedFinishGroup && (
            <ColorCardList>
              {selectedFinishGroup.materialConfigs.map(renderColorCard)}
            </ColorCardList>
          )}
        </MaterialStepSection>
      </Section>
    )
  }

  if (selectedModelConfigs.length === 0) {
    return <Headline label="Select a file to start customizing" modifiers={['xl', 'light']} />
  }

  return (
    <>
      <Headline label="Customize your selection" modifiers={['xl', 'light']} />
      {renderMaterialSection()}
      {renderFinishSection()}
      {renderColorSection()}
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
  withState('materialFilter', 'setMaterialFilter', ''),
  withHandlers({
    selectMaterialGroup: ({onChange, setMaterialFilter}) => id => {
      onChange({
        materialGroupId: id,
        materialId: null,
        finishGroupId: null,
        materialConfigId: null,
        step: SELECTED_STEP.MATERIAL
      })
      setMaterialFilter('')
    },
    selectMaterial: ({onChange, selectedState}) => id => {
      onChange({
        ...selectedState,
        materialId: id,
        finishGroupId: null,
        materialConfigId: null,
        step: SELECTED_STEP.FINISH
      })
    },
    selectFinishGroup: ({onChange, selectedState}) => id => {
      onChange({
        ...selectedState,
        finishGroupId: id,
        materialConfigId: null,
        step: SELECTED_STEP.COLOR
      })
    },
    selectMaterialConfig: ({onChange, selectedState}) => id => {
      onChange({
        ...selectedState,
        materialConfigId: id,
        step: null
      })
    },
    selectStep: ({onChange, selectedState}) => step => {
      onChange({
        ...selectedState,
        step
      })
    },
    selectNextStep: ({onChange, selectedState}) => () => {
      let step = null
      if (!selectedState.materialId) {
        step = SELECTED_STEP.MATERIAL
      } else if (!selectedState.finishGroupId) {
        step = SELECTED_STEP.FINISH
      } else if (!selectedState.materialConfigId) {
        step = SELECTED_STEP.COLOR
      }

      onChange({
        ...selectedState,
        step
      })
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
      debouncedReceiveQuotes: debounce(receiveQuotes, 1000)
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
