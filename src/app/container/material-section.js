import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import {buildClassArray} from 'Lib/build-class-name'

import Section from 'Component/section'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import ProviderProgressBar from 'Component/provider-progress-bar'
import SelectMenu from 'Component/select-menu'
import SelectField from 'Component/select-field'

import {selectMaterial} from 'Action/material'

const MaterialSection = ({
  materials,
  onSelectedMaterial,
  selectedMaterial,
  price
}) => {
  // TODO: put all the business logic in this container into its own lib

  // The price for each material
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
  }

  const headlineModifiers = buildClassArray({
    xl: true,
    disabled: !materials
  })

  const materialMenuValues = getMaterialConfigs().map(material => ({
    type: 'material',
    value: material.id,
    label: material.name,
    hasColor: Boolean(material.color),
    price: prices(material)
  }))
  const materialMenu = (
    <SelectMenu modifiers={['l']} values={materialMenuValues} />
  )
  const selectedValue = selectedMaterial
    ? {value: selectedMaterial, label: 'TODO'}
    : undefined

  return (
    <Section>
      <Headline label="2. Choose a material" modifiers={headlineModifiers} />
      {Boolean(materials) && (
        <Grid>
          <Column md={8}>
            <SelectField
              placeholder="Placeholder"
              menu={materialMenu}
              value={selectedValue}
              onChange={({value}) => onSelectedMaterial(value)}
            />
          </Column>
          <Column md={4} classNames={['u-margin-bottom']}>
            {/* TODO: implement progress bar steps */}
            <ProviderProgressBar currentStep={1} totalSteps={3} />
          </Column>
        </Grid>
      )}
    </Section>
  )
}

const mapStateToProps = state => ({
  materials: state.material.materials,
  selectedMaterial: state.material.selectedMaterial,
  price: state.price.price
})

const mapDispatchToProps = {
  onSelectedMaterial: selectMaterial
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(MaterialSection)
