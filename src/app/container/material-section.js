import React from 'react'
import {compose, lifecycle} from 'recompose'

import scrollTo from 'Service/scroll-to'
import {buildClassArray} from 'Lib/build-class-name'
import {
  selectCurrentMaterial,
  selectCurrentMaterialGroup,
  selectPrintingServiceRequests,
  selectAreAllUploadsFinished
} from 'Lib/selector'
import {getBestOfferForMaterial} from 'Lib/material'
import {formatPrice} from 'Lib/formatter'
import getCloudinaryUrl from 'Lib/cloudinary'

import Section from 'Component/section'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import ProviderProgressBar from 'Component/provider-progress-bar'
import MaterialCard from 'Component/material-card'
import MaterialSlider from 'Component/material-slider'
import Price from 'Component/price'
import RadioButtonGroup from 'Component/radio-button-group'
import RadioButton from 'Component/radio-button'

import {
  selectMaterialGroup,
  selectMaterial
} from 'Action/material'
import {openMaterialModal} from 'Action/modal'

import {connectLegacy} from './util/connect-legacy'

const MaterialSection = ({
  areAllUploadsFinished,
  offers,
  materials,
  selectedMaterialGroup,
  selectedMaterial,
  printingServiceRequests,
  onSelectMaterial,
  onSelectMaterialGroup,
  onOpenMaterialModal
}) => {
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !areAllUploadsFinished
  })

  function renderMaterialCard(material) {
    const bestOffer = getBestOfferForMaterial(offers, material)
    const price = (
      <Price
        value={
          bestOffer
            ? formatPrice(bestOffer.totalPrice, bestOffer.currency, bestOffer.priceEstimated)
            : undefined
        }
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
          !bestOffer &&
          printingServiceRequests &&
          printingServiceRequests.complete === printingServiceRequests.total
        }
        onSelectClick={() => {
          onSelectMaterial(material.id)
          scrollTo('#section-finish')
        }}
        onMoreClick={() => {
          onOpenMaterialModal({materialId: material.id})
        }}
      />
    )
  }

  return (
    <Section id="section-material">
      <Headline label="2. Choose a material" modifiers={headlineModifiers} />
      {areAllUploadsFinished && (
        <Grid>
          <Column lg={8} classNames={['u-margin-bottom-xl']}>
            <RadioButtonGroup
              name="material-group"
              value={selectedMaterialGroup.id}
              onChange={value => onSelectMaterialGroup(value)}
            >
              {materials.materialStructure.map(group => (
                <RadioButton key={group.id} value={group.id} label={group.name} />
              ))}
            </RadioButtonGroup>
          </Column>
          {Boolean(printingServiceRequests) && (
            <Column lg={4} classNames={['u-margin-bottom-xl']}>
              <ProviderProgressBar
                currentStep={printingServiceRequests.complete}
                totalSteps={printingServiceRequests.total}
              />
            </Column>
          )}
        </Grid>
      )}
      {areAllUploadsFinished &&
        selectedMaterialGroup && (
          <MaterialSlider>{selectedMaterialGroup.materials.map(renderMaterialCard)}</MaterialSlider>
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  areAllUploadsFinished: selectAreAllUploadsFinished(state),
  offers: state.price.offers || [],
  materials: state.material.materials,
  selectedMaterialGroup: selectCurrentMaterialGroup(state),
  selectedMaterial: selectCurrentMaterial(state),
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onSelectMaterial: selectMaterial,
  onSelectMaterialGroup: selectMaterialGroup,
  onOpenMaterialModal: openMaterialModal
}

export default compose(
  connectLegacy(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (!prevProps.areAllUploadsFinished && this.props.areAllUploadsFinished) {
        scrollTo('#section-material')
      }
    }
  })
)(MaterialSection)
