import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withPropsOnChange from 'recompose/withPropsOnChange'
import flatten from 'lodash/flatten'

import scrollTo from '../service/scroll-to'
import {openIntercom} from '../service/intercom'
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
import Link from '../component/link'
import SearchField from '../component/search-field'

import {selectMaterial, selectMaterialGroup, filterMaterials} from '../action/material'
import {openMaterialModal} from '../action/modal'

import {createMaterialSearch} from '../service/search'
import {connectLegacy} from './util/connect-legacy'
import Paragraph from '../component/paragraph'

const MaterialSection = ({
  areAllUploadsFinished,
  offers,
  materialGroups,
  filteredMaterials,
  selectedMaterialGroup,
  selectedMaterial,
  printingServiceRequests,
  onSelectMaterial,
  onSelectMaterialGroup,
  onOpenMaterialModal,
  onFilterMaterials
}) => {
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !areAllUploadsFinished
  })

  const materials =
    filteredMaterials ||
    (selectedMaterialGroup && selectedMaterialGroup.materials) ||
    flatten(materialGroups.map(group => group.materials))

  function renderMaterialCard(material) {
    const bestOffer = getBestOfferForMaterial(offers, material)
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
          <Column lg={3} classNames={['u-margin-bottom']}>
            {/* Use key to force rerender to clear state when selectedMaterialGroup changes */}
            <SearchField
              key={selectedMaterialGroup && selectedMaterialGroup.id}
              name="material-search"
              placeholder="Search…"
              onChange={onFilterMaterials}
            />
          </Column>
          <Column lg={5} classNames={['u-margin-bottom']}>
            <RadioButtonGroup
              name="material-group"
              value={(selectedMaterialGroup && selectedMaterialGroup.id) || undefined}
              onChange={value => onSelectMaterialGroup(value)}
            >
              <RadioButton key="__ALL__" value={undefined} label="All" />
              {materialGroups.map(group => (
                <RadioButton key={group.id} value={group.id} label={group.name} />
              ))}
            </RadioButtonGroup>
          </Column>
          {Boolean(printingServiceRequests) && (
            <Column lg={4} classNames={['u-margin-bottom-l', 'u-align-right']}>
              {[
                <ProviderProgressBar
                  key={0}
                  classNames={['u-margin-bottom']}
                  currentStep={printingServiceRequests.complete}
                  totalSteps={printingServiceRequests.total}
                />,
                <Paragraph key={1} classNames={['u-no-margin']}>
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
              ]}
            </Column>
          )}
        </Grid>
      )}
      {areAllUploadsFinished &&
        materials.length > 0 && (
          <MaterialSlider>{materials.map(renderMaterialCard)}</MaterialSlider>
        )}
      {areAllUploadsFinished &&
        materials.length === 0 && (
          <Paragraph modifiers={['l']} classNames={['u-align-center']}>
            No materials found.
          </Paragraph>
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  areAllUploadsFinished: selectAreAllUploadsFinished(state),
  offers: state.price.offers || [],
  materialGroups: state.material.materialGroups,
  materialFilter: state.material.materialFilter,
  selectedMaterialGroup: selectCurrentMaterialGroup(state),
  selectedMaterial: selectCurrentMaterial(state),
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onSelectMaterial: selectMaterial,
  onSelectMaterialGroup: selectMaterialGroup,
  onFilterMaterials: filterMaterials,
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
  }),
  withPropsOnChange(['materialGroups'], ({materialGroups}) => ({
    materialSearch: createMaterialSearch(flatten(materialGroups.map(group => group.materials)))
  })),
  withPropsOnChange(['materialFilter', 'materialSearch'], ({materialFilter, materialSearch}) => ({
    filteredMaterials: materialFilter.length > 0 ? materialSearch.search(materialFilter) : undefined
  }))
)(MaterialSection)
