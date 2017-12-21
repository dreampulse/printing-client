import React from 'react'
import {compose, lifecycle} from 'recompose'

import scrollTo from '../service/scroll-to'
import {buildClassArray} from '../lib/build-class-name'
import {
  selectMaterialMenuValues,
  selectCurrentMaterial,
  selectPrintingServiceRequests,
  selectAreAllUploadsFinished
} from '../lib/selector'
import {getBestOfferForMaterialConfig, getMaterialByName} from '../lib/material'
import {formatPrice, formatDeliveryTime} from '../lib/formatter'
import getCloudinaryUrl from '../lib/cloudinary'

import Section from '../component/section'
import Grid from '../component/grid'
import Column from '../component/column'
import Headline from '../component/headline'
import ProviderProgressBar from '../component/provider-progress-bar'
import SelectMenu from '../component/select-menu'
import SelectField from '../component/select-field'
import MaterialCardList from '../component/material-card-list'
import MaterialCard from '../component/material-card'
import Price from '../component/price'
import Paragraph from '../component/paragraph'
import Info from '../component/info'

import {
  selectMaterial,
  selectMaterialConfig,
  selectMaterialConfigForFinishGroup
} from '../action/material'
import {openMaterialModal} from '../action/modal'

import {connectLegacy} from './util/connect-legacy'

const MaterialSection = ({
  areAllUploadsFinished,
  offers,
  materials,
  materialMenuValues,
  selectedMaterial,
  printingServiceRequests,
  selectedMaterialConfigs,
  selectedMaterialConfig,
  onSelectMaterial,
  onSelectMaterialConfig,
  onSelectMaterialConfigForFinishGroup,
  onOpenMaterialModal
}) => {
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !areAllUploadsFinished
  })

  const materialMenu = <SelectMenu modifiers={['l']} values={materialMenuValues} />

  const selectedValue = selectedMaterial
    ? {value: selectedMaterial.id, label: selectedMaterial.name}
    : undefined

  function renderMaterialCard(finishGroup) {
    const colorValues = finishGroup.materialConfigs
      // Filter out material configs which do not have an offer
      .filter(materialConfig => Boolean(getBestOfferForMaterialConfig(offers, materialConfig.id)))
      .map(({id, color, colorCode, colorImage}) => ({
        value: id,
        colorValue: colorCode,
        label: color,
        colorImage: colorImage
          ? getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill'])
          : undefined
      }))

    let bestOffer = getBestOfferForMaterialConfig(offers, selectedMaterialConfigs[finishGroup.id])
    let selectedColorValue = colorValues.find(
      ({value}) =>
        selectedMaterialConfigs[finishGroup.id] !== undefined &&
        value === selectedMaterialConfigs[finishGroup.id]
    )

    // If selected config does not have an offer
    // try to select first config which has an offer
    if (!selectedColorValue) {
      selectedColorValue = colorValues.length > 0 ? colorValues[0] : undefined
      if (selectedColorValue) {
        bestOffer = getBestOfferForMaterialConfig(offers, selectedColorValue.value)
      }
    }

    const colorMenu = colorValues.length > 1 ? <SelectMenu values={colorValues} /> : undefined
    const materialPrice = (
      <Price
        value={
          bestOffer
            ? formatPrice(bestOffer.totalPrice, bestOffer.currency, bestOffer.priceEstimated)
            : undefined
        }
        meta="incl. tax & shipping"
      />
    )
    const colorSelect = (
      <SelectField
        modifiers={['compact']}
        menu={colorMenu}
        value={selectedColorValue}
        onChange={({value}) =>
          onSelectMaterialConfigForFinishGroup({
            materialConfigId: value,
            finishGroupId: finishGroup.id
          })}
      />
    )
    const info = (
      <Info>
        <Headline modifiers={['s']} label="Delivery Time" />
        <Paragraph>
          The delivery time is an approximate summary of production time and shipping time. Please
          note that some materials may have a longer production time.
        </Paragraph>
        <Paragraph>Plastics: 2-8 days</Paragraph>
        <Paragraph>Metals: 6-15 days</Paragraph>
        <Paragraph>Other materials: 6-15 days</Paragraph>
      </Info>
    )

    return (
      <MaterialCard
        key={finishGroup.id}
        title={finishGroup.name}
        subline={finishGroup.materialName}
        shipping={bestOffer && formatDeliveryTime(bestOffer.shipping.deliveryTime)}
        description={finishGroup.summary}
        price={materialPrice}
        info={info}
        image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
        colorSelect={colorSelect}
        selected={selectedColorValue && selectedColorValue.value === selectedMaterialConfig}
        loading={!bestOffer}
        unavailable={
          !bestOffer &&
          printingServiceRequests &&
          printingServiceRequests.complete === printingServiceRequests.total
        }
        onSelectClick={
          selectedColorValue &&
          (() => {
            onSelectMaterialConfig(selectedColorValue.value)
            scrollTo('#section-provider')
          })
        }
        onMoreClick={() => {
          const material = getMaterialByName(materials, finishGroup.materialName)
          if (material) {
            onOpenMaterialModal({materialId: material.id, finishGroupId: finishGroup.id})
          }
        }}
      />
    )
  }

  return (
    <Section id="section-material">
      <Headline label="2. Choose a material" modifiers={headlineModifiers} />
      {areAllUploadsFinished && (
        <Grid>
          <Column lg={8} classNames={['u-margin-bottom']}>
            <SelectField
              placeholder="Placeholder"
              menu={materialMenu}
              value={selectedValue}
              onChange={({value}) => onSelectMaterial(value)}
            />
          </Column>
          <Column lg={4} classNames={['u-margin-bottom-xl']}>
            {Boolean(printingServiceRequests) && (
              <ProviderProgressBar
                currentStep={printingServiceRequests.complete}
                totalSteps={printingServiceRequests.total}
              />
            )}
          </Column>
        </Grid>
      )}
      {areAllUploadsFinished &&
        selectedMaterial &&
        selectedMaterial.finishGroups.length > 0 && (
          <MaterialCardList>
            {selectedMaterial.finishGroups.map(renderMaterialCard)}
          </MaterialCardList>
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  areAllUploadsFinished: selectAreAllUploadsFinished(state),
  offers: state.price.offers || [],
  materials: state.material.materials,
  materialMenuValues: selectMaterialMenuValues(state),
  selectedMaterial: selectCurrentMaterial(state),
  selectedMaterialConfigs: state.material.selectedMaterialConfigs,
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onSelectMaterial: selectMaterial,
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectMaterialConfigForFinishGroup: selectMaterialConfigForFinishGroup,
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
