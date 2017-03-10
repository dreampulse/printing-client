import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'
import {
  selectMaterialMenuValues,
  selectCurrentMaterial
} from 'Lib/selector'
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
  // price,
  materialMenuValues,
  selectedMaterial,
  selectedMaterialConfigs,
  selectedMaterialConfig,
  onSelectMaterial,
  onSelectMaterialConfig,
  onSelectMaterialConfigForFinishGroup
}) => {
  // TODO: put all the business logic in this container into its own lib

  // The price for each material
  /*
  const pricesForMaterials = price && price.items.reduce((acc, item, index) => ({
    ...acc,
    [item.materialId]: Object.keys(price.printingService)
      .reduce((acc2, key) => ({
        ...acc2,
        [key]: price.printingService[key].items[index]
      }), {})
  }), {})

  const getPriceForMaterialId = id => (
    pricesForMaterials ? pricesForMaterials[id] : null
  )

  // This is just an example of how to traverse the material structure
  // for a simple drop down
  // put such logic in the /lib-folder
  const getMaterialConfigs = () => {
    const materialConfigs = []
    if (!materials || !materials.materialStructure) return materialConfigs
    materials.materialStructure.forEach(materialGroup =>
      materialGroup.materials.forEach(material =>
        material.finishGroups.forEach(finishGroup =>
          finishGroup.materialConfigs.forEach(materialConfig =>
            materialConfigs.push({
              ...materialConfig,
              prices: getPriceForMaterialId(materialConfig.id)
            })
          )
        )
      )
    )
    return materialConfigs
  }

  // get a string for all the prices of the different vendors
  // the stub provides unfortunately only the price for one material
  const prices = (material) => {
    if (material.prices) {
      return Object.keys(material.prices)
        .map(key => material.prices[key].price)
        .join(', ')
    }
    return ''
  } */

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
    const info = (
      <Info>
        <Headline modifiers={['s']} label="TODO Headline" />
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </Paragraph>
      </Info>
    )
    const colorValues = finishGroup.materialConfigs.map(({id, color, colorCode}) => ({
      value: id,
      colorValue: colorCode,
      label: color
      /* TODO: colorImage */
    }))
    const selectedColorValue = colorValues.filter(({value}) => (
      value === selectedMaterialConfigs[finishGroup.id]
    ))[0]

    const colorMenu = colorValues.length > 1 ? (<SelectMenu values={colorValues} />) : undefined
    const materialPrice = <Price value="$19.99" meta="incl. tax & shipping" />
    const colorSelect = (
      <SelectField
        modifiers={['compact']}
        menu={colorMenu}
        value={selectedColorValue}
        onChange={({value}) => onSelectMaterialConfigForFinishGroup(value, finishGroup.id)}
      />
    )

    // TODO: different card states are not implemented yet
    // TODO: onMoreClick handling
    return (
      <MaterialCard
        key={finishGroup.name}
        title={finishGroup.materialName}
        shipping="TODO 2-5 days, no express"
        subline={finishGroup.name}
        description={finishGroup.summary}
        price={materialPrice}
        info={info}
        image={getCloudinaryUrl(finishGroup.featuredImage, ['w_700', 'h_458', 'c_fill'])}
        colorSelect={colorSelect}
        selected={selectedColorValue.value === selectedMaterialConfig}
        onSelectClick={() => onSelectMaterialConfig(selectedColorValue.value)}
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
            {/* TODO: implement progress bar steps */}
            <ProviderProgressBar currentStep={1} totalSteps={3} />
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
  selectedMaterialConfig: state.material.selectedMaterialConfig
})

const mapDispatchToProps = {
  onSelectMaterial: selectMaterial,
  onSelectMaterialConfig: selectMaterialConfig,
  onSelectMaterialConfigForFinishGroup: selectMaterialConfigForFinishGroup
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MaterialSection)
