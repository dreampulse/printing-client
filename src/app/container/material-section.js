import React from 'react'
import {compose, lifecycle} from 'recompose'

import scrollTo from '../service/scroll-to'
import {buildClassArray} from '../lib/build-class-name'
import {
  selectCurrentMaterial,
  selectCurrentMaterialGroup,
  selectPrintingServiceRequests,
  selectAreAllUploadsFinished
} from '../lib/selector'
import {getBestOfferForMaterial} from '../lib/material'
import {formatPrice} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'

import Section from '../component/section'
import Grid from '../component/grid'
import Column from '../component/column'
import Headline from '../component/headline'
import ProviderProgressBar from '../component/provider-progress-bar'
import MaterialCard from '../component/material-card'
import Price from '../component/price'
import RadioButton from '../component/radio-button'
import RadioButtonGroup from '../component/radio-button-group'
import MaterialSlider from '../component/material-slider'

import {selectMaterial, selectMaterialGroup} from '../action/material'
import {openMaterialModal} from '../action/modal'

import {connectLegacy} from './util/connect-legacy'

const MaterialSection = ({
  areAllUploadsFinished,
  offers,
  materialGroups,
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
    console.log(bestOffer, offers, material)
    const price = (
      <Price
        value={bestOffer ? formatPrice(bestOffer.totalPrice, bestOffer.currency) : undefined}
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
              {materialGroups.map(group => (
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
  materialGroups: state.material.materialGroups,
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
