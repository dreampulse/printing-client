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

  const keys = Object.keys(models)
  if (keys.length === 0) {
    return undefined
  }

  return keys.reduce((quantity, modelId) => {
    const modelQuantity = models[modelId].quantity
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
  let selectedMaterialConfig
  materials.materialStructure.every((materialGroup) => {
    materialGroup.materials.every((material) => {
      material.finishGroups.every((finishGroup) => {
        finishGroup.materialConfigs.every((materialConfig) => {
          if (materialConfig.id === materialConfigId) {
            selectedMaterial = material
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
    materialConfig: selectedMaterialConfig
  }
}

export const selectedOfferMaterial = (state) => {
  const {
    cart: {
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

export const selectThumbnailUrlByModelId = (state, modelId) => {
  const {
    model: {models}
  } = state
  return models[modelId] ? models[modelId].thumbnailUrl : null
}

export const selectNameByModelId = (state, modelId) => {
  const {
    model: {models}
  } = state
  return models[modelId] ? models[modelId].name : null
}

export const selectOfferItems = (state) => {
  const {
    cart: {
      selectedOffer: {items}
    }
  } = state

  return items.map(item => ({
    ...item,
    thumbnailUrl: selectThumbnailUrlByModelId(state, item.modelId),
    name: selectNameByModelId(state, item.modelId)
  }))
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
