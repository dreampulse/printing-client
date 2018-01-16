// @flow

import get from 'lodash/get'
import URLSearchParams from 'url-search-params'

import type {State, Features} from '../type'

export const selectCommonQuantity = (state: State) => {
  // Common quantity exists only if all models have the same individual quantity
  const {model: {models}} = state

  if (models.length === 0) {
    return undefined
  }

  return models.reduce((quantity, model) => {
    let modelQuantity
    if (model.quantity) {
      modelQuantity = model.quantity
    }
    if (quantity === null) {
      return modelQuantity
    }
    if (quantity === modelQuantity) {
      return quantity
    }
    return undefined
  }, null)
}

export const selectMaterialGroup = (state: State, groupId: ?string) => {
  const {material: {materialGroups}} = state

  if (!materialGroups) {
    return null
  }

  // Search for group by id
  let materialGroup = null

  materialGroups.forEach(item => {
    if (item.id === groupId) {
      materialGroup = item
    }
  })

  return materialGroup
}

export const selectMaterial = (state: State, materialId: ?string) => {
  const {material: {materialGroups}} = state

  if (!materialGroups || !materialId) {
    return null
  }

  // Search for material by id
  let material = null

  materialGroups.forEach(materialGroup => {
    materialGroup.materials.forEach(item => {
      if (item.id === materialId) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByName = (state: State, name: string) => {
  const {material: {materialGroups}} = state

  if (!materialGroups) {
    return null
  }

  // Search for material by name
  let material = null

  materialGroups.forEach(materialGroup => {
    materialGroup.materials.forEach(item => {
      if (item.name === name) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByMaterialConfigId = (state: State, materialConfigId: string) => {
  const materialGroups = state.material.materialGroups

  if (!materialGroups) {
    return null
  }

  let selectedMaterial
  let selectedFinishGroup
  let selectedMaterialConfig
  materialGroups.every(materialGroup => {
    materialGroup.materials.every(material => {
      material.finishGroups.every(finishGroup => {
        finishGroup.materialConfigs.every(materialConfig => {
          if (materialConfig.id === materialConfigId) {
            selectedMaterial = material
            selectedFinishGroup = finishGroup
            selectedMaterialConfig = materialConfig
          }
          return !selectedMaterial
        })
        return !selectedMaterial
      })
      return !selectedMaterial
    })
    return !selectedMaterial
  })

  return {
    material: selectedMaterial,
    finishGroup: selectedFinishGroup,
    materialConfig: selectedMaterialConfig
  }
}

export const selectedOfferMaterial = (state: State) => {
  if (!state.price.selectedOffer) {
    return null
  }

  const materialConfigId = state.price.selectedOffer.materialConfigId
  return selectMaterialByMaterialConfigId(state, materialConfigId)
}

export const selectFinishGroup = (state: State, materialId: string, finishGroupId: string) => {
  const material = selectMaterial(state, materialId)
  if (!material) {
    return null
  }

  // Search for finish group by id
  let finishGroup = null

  material.finishGroups.forEach(item => {
    if (item.id === finishGroupId) {
      finishGroup = item
    }
  })

  return finishGroup
}

export const selectCurrentMaterialGroup = (state: State) => {
  const {material: {materialGroups, selectedMaterialGroup}} = state

  if (!materialGroups) {
    return null
  }

  return (
    selectMaterialGroup(state, selectedMaterialGroup) || materialGroups[0] // Use first group per default
  )
}

export const selectCurrentMaterial = (state: State) => {
  const selectedMaterial = state.material.selectedMaterial
  return selectMaterial(state, selectedMaterial)
}

export const selectModelByModelId = (state: State, modelId: string) => {
  const {model: {models}} = state

  return (
    models.find(model => {
      if (!model.modelId) return false
      return model.modelId === modelId
    }) || null
  )
}

export const selectOfferItems = (state: State) => {
  if (!state.price.selectedOffer) {
    return null
  }

  const items = state.price.selectedOffer.items

  return items.map(item => {
    const model = selectModelByModelId(state, item.modelId)

    let thumbnailUrl = null
    if (model && model.thumbnailUrl) {
      thumbnailUrl = model.thumbnailUrl
    }
    return {
      ...item,
      thumbnailUrl,
      fileName: model ? model.fileName : null
    }
  })
}

export const selectOffersForSelectedMaterialConfig = (state: State) => {
  const {price: {offers}, material: {selectedMaterialConfig}} = state

  if (!offers) {
    return null
  }

  return offers.filter(offer => offer.materialConfigId === selectedMaterialConfig)
}

export const selectPrintingServiceRequests = (state: State) => {
  const {price: {printingServiceComplete}} = state

  if (!printingServiceComplete) {
    return null
  }

  const printingServices = Object.keys(printingServiceComplete)
  return {
    complete: printingServices.filter(key => printingServiceComplete[key]).length,
    total: printingServices.length
  }
}

export const selectAreAllUploadsFinished = (state: State) => {
  const {model: {numberOfUploads, models}} = state

  return numberOfUploads === 0 && models.length > 0
}

export const selectSearchParams = (state: State) =>
  // TODO: This should be part of our own state
  new URLSearchParams(get(state, 'routing.location.search') || '')

export const selectFeatures = (state: State): Features => {
  const searchParams = selectSearchParams(state)
  const features: Features = {}

  Array.from(searchParams.keys())
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .forEach((name: string) => {
      features[name] = true
    })

  return features
}
