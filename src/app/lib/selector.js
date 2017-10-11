import {
  hasMaterialMultipleConfigs,
  getBestOfferForMaterial
} from 'Lib/material'
import {
  formatPrice
} from 'Lib/formatter'

import config from '../../../config'

export const selectCommonQuantity = (state) => {
  // Common quantity exists only if all models have the same individual quantity
  const {
    model: {
      models
    }
  } = state

  if (models.length === 0) {
    return undefined
  }

  return models.reduce((quantity, model) => {
    const modelQuantity = model.quantity
    if (quantity === null) {
      return modelQuantity
    }
    if (quantity === modelQuantity) {
      return quantity
    }
    return undefined
  }, null)
}

export const selectMaterialMenuValues = (state) => {
  const {
    price: {
      offers
    },
    material: {
      materials
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return []
  }

  return materials.materialStructure.map(materialGroup => ({
    type: 'group',
    label: materialGroup.name,
    children: materialGroup.materials.map((material) => {
      const offer = offers && getBestOfferForMaterial(offers, material)
      return {
        type: 'material',
        value: material.id,
        label: material.name,
        hasColor: hasMaterialMultipleConfigs(material),
        price: offer ? `From ${formatPrice(offer.totalPrice, offer.currency, offer.priceEstimated)}` : undefined
      }
    })
  }))
}

export const selectMaterial = (state, materialId) => {
  const {
    material: {
      materials
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for material by id
  let material = null

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((item) => {
      if (item.id === materialId) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByName = (state, name) => {
  const {
    material: {
      materials
    }
  } = state

  if (!materials || !materials.materialStructure) {
    return null
  }

  // Search for material by name
  let material = null

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((item) => {
      if (item.name === name) {
        material = item
      }
    })
  })

  return material
}

export const selectMaterialByMaterialConfigId = (state, materialConfigId) => {
  const {
    material: {
      materials
    }
  } = state

  let selectedMaterial
  let selectedFinishGroup
  let selectedMaterialConfig
  materials.materialStructure.every((materialGroup) => {
    materialGroup.materials.every((material) => {
      material.finishGroups.every((finishGroup) => {
        finishGroup.materialConfigs.every((materialConfig) => {
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

export const selectedOfferMaterial = (state) => {
  const {
    price: {
      selectedOffer: {
        materialConfigId
      }
    }
  } = state
  return selectMaterialByMaterialConfigId(state, materialConfigId)
}

export const selectFinishGroup = (state, materialId, finishGroupId) => {
  const material = selectMaterial(state, materialId)
  if (!material) {
    return null
  }

  // Search for finish group by id
  let finishGroup = null

  material.finishGroups.forEach((item) => {
    if (item.id === finishGroupId) {
      finishGroup = item
    }
  })

  return finishGroup
}

export const selectCurrentMaterial = (state) => {
  const {
    material: {
      selectedMaterial
    }
  } = state

  return selectMaterial(state, selectedMaterial) ||
    selectMaterialByName(state, config.defaultSelectedMaterial)
}

export const selectModelByModelId = (state, modelId) => {
  const {
    model: {models}
  } = state

  return models
    .filter(model => model.modelId === modelId)
    .shift() || null
}

export const selectOfferItems = (state) => {
  const {
    price: {
      selectedOffer: {items}
    }
  } = state

  return items.map((item) => {
    const model = selectModelByModelId(state, item.modelId)
    return {
      ...item,
      thumbnailUrl: model ? model.thumbnailUrl : null,
      fileName: model ? model.fileName : null
    }
  })
}

export const selectOffersForSelectedMaterialConfig = (state) => {
  const {
    price: {
      offers
    },
    material: {
      selectedMaterialConfig
    }
  } = state

  if (!offers) {
    return null
  }

  return offers.filter(offer => offer.materialConfigId === selectedMaterialConfig)
}

export const selectPrintingServiceRequests = (state) => {
  const {
    price: {
      printingServiceComplete
    }
  } = state

  if (!printingServiceComplete) {
    return null
  }

  const printingServices = Object.keys(printingServiceComplete)
  return {
    complete: printingServices.filter(key => printingServiceComplete[key]).length,
    total: printingServices.length
  }
}

export const selectAreAllUploadsFinished = (state) => {
  const {
    model: {
      numberOfUploads,
      models
    }
  } = state

  return numberOfUploads === 0 && models.length > 0
}

export const selectFeatures = (state) => {
  const {
    routing: {
      locationBeforeTransitions: {
        query
      }
    }
  } = state

  return Object.keys(query)
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .reduce((agg, name) => {
      agg[name] = true
      return agg
    }, {})
}
