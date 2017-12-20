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
  const {material: {materials}} = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for group by id
  let materialGroup = null

  materials.materialStructure.forEach(item => {
    if (item.id === groupId) {
      materialGroup = item
    }
  })

  return materialGroup
}

export const selectMaterial = (state: State, materialId: ?string) => {
  const {material: {materials}} = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for material by id
  let material = null

  materials.materialStructure.forEach(materialGroup => {
    materialGroup.materials.forEach(item => {
      if (item.id === materialId) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByName = (state: State, name: string) => {
  const {material: {materials}} = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for material by name
  let material = null

  materials.materialStructure.forEach(materialGroup => {
    materialGroup.materials.forEach(item => {
      if (item.name === name) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByMaterialConfigId = (state: State, materialConfigId: string) => {
  const materials = state.material.materials

  if (!materials) throw new Error('Material structure not loaded')

  let selectedMaterial
  let selectedFinishGroup
  let selectedMaterialConfig
  materials.materialStructure.every(materialGroup => {
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
  if (!state.price.selectedOffer) throw new Error('No offer selected')

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
  if (!state.material.materials || !state.material.materials.materialStructure) {
    return null
  }

  const selectedMaterialGroup = state.material.selectedMaterialGroup
  const materialStructure = state.material.materials.materialStructure

  return (
    selectMaterialGroup(state, selectedMaterialGroup) || materialStructure[0] // Use first group per default
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
  if (!state.price.selectedOffer) throw new Error('No offer selected')

  const items = state.price.selectedOffer.items

  return items.map(item => {
    const model = selectModelByModelId(state, item.modelId)

    // TODO: this is because of type Model = ModelCompleted | ModelUploading
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

export const selectLocationQuery = (state: State) =>
  new URLSearchParams(get(state, 'routing.location.search') || '')

export const selectFeatures = (state: State): Features => {
  const query = selectLocationQuery(state)
  const features: Features = {}

  return Array.from(query.keys())
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .reduce((agg: Features, name: string) => {
      agg[name] = true
      return agg
    }, features)
}
