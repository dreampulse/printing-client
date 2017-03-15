import React from 'react'
import {connect} from 'react-redux'
import {compose, lifecycle} from 'recompose'

import scrollTo from 'Service/scroll-to'
import {buildClassArray} from 'Lib/build-class-name'
import {
  selectMaterialMenuValues,
  selectCurrentMaterial,
  selectPrintingServiceRequests
} from 'Lib/selector'
import {
  getBestOfferForMaterialConfig
} from 'Lib/material'
import {
  formatPrice,
  formatDeliveryTime
} from 'Lib/formatter'
import getCloudinaryUrl from 'Lib/cloudinary'

import Section from 'Component/section'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import ProviderProgressBar from 'Component/provider-progress-bar'
import SelectMenu from 'Component/select-menu'
import SelectField from 'Component/select-field'
import MaterialCardList from 'Component/material-card-list'
import MaterialCard from 'Component/material-card'
import Price from 'Component/price'
import Paragraph from 'Component/paragraph'
import Info from 'Component/info'

import {
  selectMaterial,
  selectMaterialConfig,
  selectMaterialConfigForFinishGroup
} from 'Action/material'

const MaterialSection = ({
  areAllUploadsFinished,
  price,
  materialMenuValues,
  selectedMaterial,
  printingServiceRequests,
  selectedMaterialConfigs,
  selectedMaterialConfig,
  onSelectMaterial,
  onSelectMaterialConfig,
  onSelectMaterialConfigForFinishGroup
}) => {
  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !areAllUploadsFinished
  })

  const materialMenu = (
    <SelectMenu modifiers={['l']} values={materialMenuValues} />
  )

  const selectedValue = selectedMaterial
    ? {value: selectedMaterial.id, label: selectedMaterial.name}
    : undefined

  function renderMaterialCard (finishGroup) {
    const colorValues = finishGroup.materialConfigs
      // Filter out material configs which do not have an offer
      .filter(materialConfig => (
        Boolean(getBestOfferForMaterialConfig(materialConfig.id, price))
      ))
      .map(({id, color, colorCode, colorImage}) => ({
        value: id,
        colorValue: colorCode,
        label: color,
        colorImage: colorImage ? getCloudinaryUrl(colorImage, ['w_40', 'h_40', 'c_fill']) : undefined
      }))

    let bestOffer = getBestOfferForMaterialConfig(
      selectedMaterialConfigs[finishGroup.id],
      price
    )
    let selectedColorValue = colorValues.find(({value}) => (
      selectedMaterialConfigs[finishGroup.id] !== undefined &&
      value === selectedMaterialConfigs[finishGroup.id]
    ))

    // If selected config does not have an offer
    // try to select first config which has an offer
    if (!selectedColorValue) {
      selectedColorValue = colorValues.length > 0 ? colorValues[0] : undefined
      if (selectedColorValue) {
        bestOffer = getBestOfferForMaterialConfig(
          selectedColorValue.value,
          price
        )
      }
    }

    const colorMenu = colorValues.length > 1 ? (<SelectMenu values={colorValues} />) : undefined
    const materialPrice = (
      <Price
        value={bestOffer ? formatPrice(bestOffer.price, bestOffer.offer.currency) : undefined}
        meta="incl. tax & shipping"
      />
    )
    const colorSelect = (
      <SelectField
        modifiers={['compact']}
        menu={colorMenu}
        value={selectedColorValue}
        onChange={({value}) => onSelectMaterialConfigForFinishGroup({
          materialConfigId: value,
          finishGroupId: finishGroup.id
        })}
      />
    )
    const info = (
      <Info>
        <Headline modifiers={['s']} label="TODO Headline" />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Paragraph>
      </Info>
    )

    // TODO: onMoreClick handling
    return (
      <MaterialCard
        key={finishGroup.name}
        title={finishGroup.materialName}
        shipping={bestOffer && formatDeliveryTime(bestOffer.offer.shipping.deliveryTime)}
        subline={finishGroup.name}
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
      {areAllUploadsFinished && selectedMaterial && selectedMaterial.finishGroups.length > 0 && (
        <MaterialCardList>
          {selectedMaterial.finishGroups.map(renderMaterialCard)}
        </MaterialCardList>
      )}
    </Section>
  )
}

const mapStateToProps = state => ({
  areAllUploadsFinished: state.model.areAllUploadsFinished,
  price: state.price.price,
  materialMenuValues: selectMaterialMenuValues(state),
  selectedMaterial: selectCurrentMaterial(state),
  selectedMaterialConfigs: state.material.selectedMaterialConfigs,
  selectedMaterialConfig: state.material.selectedMaterialConfig,
  printingServiceRequests: selectPrintingServiceRequests(state)
})

const mapDispatchToProps = {
  onSelectMaterial: selectMaterial,
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectMaterialConfigForFinishGroup: selectMaterialConfigForFinishGroup
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate (prevProps) {
      if (!prevProps.areAllUploadsFinished && this.props.areAllUploadsFinished) {
        scrollTo('#section-material')
      }
    }
  })
)(MaterialSection)
