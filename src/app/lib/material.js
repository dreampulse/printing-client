// @flow

import uniq from 'lodash/uniq'

import config from '../../../config'

import type {
  MaterialGroup,
  MaterialGroupId,
  MaterialId,
  Material,
  Quote,
  MaterialConfigId,
  VendorId,
  FinishGroupId,
  FinishGroup
} from '../type-next'

export function hasMaterialMultipleConfigs(material: Material) {
  return !material.finishGroups.every(finishGroup => finishGroup.materialConfigs.length <= 1)
}

function getBestQuote(quotes: Array<Quote>): ?Quote {
  return quotes.reduce((bestQuote, quote) => {
    const bestPrice = (bestQuote && bestQuote.price) || Number.MAX_SAFE_INTEGER
    if (quote.isPrintable && bestPrice > quote.price) {
      return quote
    }
    return bestQuote
  }, null)
}

export function getBestQuoteForMaterialConfig(
  quotes: Array<Quote>,
  materialConfigId: MaterialConfigId
): ?Quote {
  return getBestQuote(quotes.filter(quote => quote.materialConfigId === materialConfigId))
}

export function getBestQuoteForMaterial(quotes: Array<Quote>, material: Material): ?Quote {
  const materialConfigs = {}
  material.finishGroups.forEach(finishGroup => {
    finishGroup.materialConfigs.forEach(materialConfig => {
      materialConfigs[materialConfig.id] = true
    })
  })

  return getBestQuote(quotes.filter(quote => materialConfigs[quote.materialConfigId]))
}

export function getMaterialConfigIdsOfMaterialGroup(materialGroup: MaterialGroup) {
  const materialConfigIds = []
  materialGroup.materials.forEach(material => {
    material.finishGroups.forEach(finishGroup => {
      finishGroup.materialConfigs.forEach(materialConfig => {
        materialConfigIds.push(materialConfig.id)
      })
    })
  })

  return materialConfigIds
}

export function getMaterialFinishGroupProviderNames(material: Material) {
  return material.finishGroups.reduce((acc, finishGroup) => {
    Object.keys(finishGroup.properties.printingServiceName).forEach(printingService => {
      if (!acc[printingService]) acc[printingService] = []
      acc[printingService].push(finishGroup.properties.printingServiceName[printingService])
      acc[printingService] = uniq(acc[printingService])
    })
    return acc
  }, {})
}

export const getMaterialGroupById = (
  materialGroups: Array<MaterialGroup>,
  groupId: MaterialGroupId
) => {
  // Search for group by id
  let materialGroup = null

  materialGroups.forEach(item => {
    if (item.id === groupId) {
      materialGroup = item
    }
  })

  return materialGroup
}

export const getFinishGroupById = (
  materialGroups: Array<MaterialGroup>,
  finishGroupId: FinishGroupId
) => {
  let foundFinishGroup = null

  materialGroups.forEach((materialGroup: MaterialGroup) => {
    materialGroup.materials.forEach((material: Material) => {
      material.finishGroups.forEach((finishGroup: FinishGroup) => {
        if (finishGroup.id === finishGroupId) {
          foundFinishGroup = finishGroup
        }
      })
    })
  })

  return foundFinishGroup
}

export function getMaterialByName(materialGroups: Array<MaterialGroup>, name: string) {
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

export const getMaterialById = (materialGroups: Array<MaterialGroup>, materialId: MaterialId) => {
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

// TODO: refactor
export const getMaterialTreeByMaterialConfigId = (
  materialGroups: Array<MaterialGroup>,
  materialConfigId: MaterialConfigId
): any => {
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

export function getProviderName(vendorId: VendorId) {
  return config.providerNames[vendorId] || vendorId
}
