import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'

export function hasMaterialMultipleConfigs(material) {
  return !material.finishGroups.every(finishGroup => finishGroup.materialConfigs.length <= 1)
}

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

export function getMaterialByName(materialGroups, name) {
  let foundMaterial = null

  materialGroups.forEach(materialGroup => {
    materialGroup.materials.forEach(material => {
      if (material.name === name) {
        foundMaterial = material
      }
    })
  })

  return foundMaterial
}

export function getMaterialConfigIdsOfMaterialGroup(materialGroup) {
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

export function getMaterialProviders(material) {
  return uniq(
    flatten(
      material.finishGroups.map(finishGroup =>
        Object.keys(finishGroup.properties.printingServiceName)
      )
    )
  )
}

export function getMaterialFinishGroupProviderNames(material) {
  return material.finishGroups.reduce((acc, finishGroup) => {
    Object.keys(finishGroup.properties.printingServiceName).forEach(printingService => {
      if (!acc[printingService]) acc[printingService] = []
      acc[printingService].push(finishGroup.properties.printingServiceName[printingService])
      acc[printingService] = uniq(acc[printingService])
    })
    return acc
  }, {})
}
