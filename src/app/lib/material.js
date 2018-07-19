// @flow

import uniq from 'lodash/uniq'

import type {MaterialGroup, MaterialGroupId, MaterialId, Material} from '../type-next'

export function hasMaterialMultipleConfigs(material: Material) {
  return !material.finishGroups.every(finishGroup => finishGroup.materialConfigs.length <= 1)
}

/*
export function getBestOfferForMaterialConfig(offers, materialConfigId) {
  return offers
    .filter(offer => offer.materialConfigId === materialConfigId)
    .reduce((bestOffer, offer) => {
      if (!bestOffer || bestOffer.subTotalPrice > offer.subTotalPrice) {
        return offer
      }
      return bestOffer
    }, null)
}

export function getBestOfferForMaterial(offers, material) {
  const materialConfigs = {}
  material.finishGroups.forEach(finishGroup => {
    finishGroup.materialConfigs.forEach(materialConfig => {
      materialConfigs[materialConfig.id] = true
    })
  })

  return offers
    .filter(offer => materialConfigs[offer.materialConfigId])
    .reduce((bestOffer, offer) => {
      if (!bestOffer || bestOffer.subTotalPrice > offer.subTotalPrice) {
        return offer
      }
      return bestOffer
    }, null)
}
*/

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
