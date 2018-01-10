export function hasMaterialMultipleConfigs(material) {
  return !material.finishGroups.every(finishGroup => finishGroup.materialConfigs.length <= 1)
}

export function getBestOfferForMaterialConfig(offers, materialConfigId) {
  return offers
    .filter(offer => offer.materialConfigId === materialConfigId)
    .reduce((bestOffer, offer) => {
      if (!bestOffer || bestOffer.totalPrice > offer.totalPrice) {
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
      if (!bestOffer || bestOffer.totalPrice > offer.totalPrice) {
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
