import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import Section from 'Component/section'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import ProviderProgressBar from 'Component/provider-progress-bar'

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
    if (!materials && !materials.materialStructure) return materialConfigs
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

  return (
    <Section>
      <Headline label="2. Choose a material" modifiers={['xl']} />
      <Grid>
        <Column md={8}>
          <select
            disabled={!materials}
            onChange={e => onSelectedMaterial(e.target.value)}
            value={selectedMaterial}
          >
            <option>Select material</option>
            {getMaterialConfigs().map((material, index) =>
              <option value={material.id} key={index}>
                {material.name} ({material.color}) {prices(material)}
              </option>
            )}
          </select>
        </Column>
        <Column md={4} classNames={['u-margin-bottom']}>
          {/* TODO: implement progress bar steps */}
          <ProviderProgressBar currentStep={1} totalSteps={3} />
        </Column>
      </Grid>
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
