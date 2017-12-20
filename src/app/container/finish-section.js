import React from 'react'
import {compose} from 'recompose'

import scrollTo from 'Service/scroll-to'
import {buildClassArray} from 'Lib/build-class-name'
import {selectCurrentMaterial, selectPrintingServiceRequests} from 'Lib/selector'
import {getBestOfferForMaterialConfig} from 'Lib/material'
import {formatPrice} from 'Lib/formatter'
import getCloudinaryUrl from 'Lib/cloudinary'

import Section from 'Component/section'
import Headline from 'Component/headline'
import SelectMenu from 'Component/select-menu'
import SelectField from 'Component/select-field'
import MaterialSlider from 'Component/material-slider'
import MaterialCard from 'Component/material-card'
import Price from 'Component/price'
import Paragraph from 'Component/paragraph'
import Info from 'Component/info'

import {selectMaterialConfig, selectMaterialConfigForFinishGroup} from 'Action/material'
import {connectLegacy} from './util/connect-legacy'

const FinishSection = ({
  offers,
  selectedMaterial,
  printingServiceRequests,
  selectedMaterialConfigs,
  selectedMaterialConfig,
  onSelectMaterialConfig,
  onSelectMaterialConfigForFinishGroup
}) => {
  const disabled = !selectedMaterial || !offers
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled
  })

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
        prefix="From"
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
      <Info modifiers={['minor']}>
        <Headline modifiers={['s']} label={finishGroup.name} />
        <Paragraph>{finishGroup.summary}</Paragraph>
      </Info>
    )

    return (
      <MaterialCard
        key={finishGroup.id}
        title={finishGroup.name}
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
      />
    )
  }

  return (
    <Section id="section-finish">
      <Headline label="3. Finish" modifiers={headlineModifiers} />
      {!disabled &&
        selectedMaterial.finishGroups.length > 0 && (
          <MaterialSlider>{selectedMaterial.finishGroups.map(renderMaterialCard)}</MaterialSlider>
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  offers: state.price.offers || [],
  materials: state.material.materials,
  selectedMaterial: selectCurrentMaterial(state),
  selectedMaterialConfigs: state.material.selectedMaterialConfigs,
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectMaterialConfigForFinishGroup: selectMaterialConfigForFinishGroup
}

export default compose(connectLegacy(mapStateToProps, mapDispatchToProps))(FinishSection)
