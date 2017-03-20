import {
  getOfferAmount
} from 'Lib/price'

export function generateMaterialIds (materials) {
  materials.materialStructure.forEach((materialGroup, groupIndex) => {
    materialGroup.id = `group-${groupIndex}`

    materialGroup.materials.forEach((material, materialIndex) => {
      material.id = `material-${groupIndex}-${materialIndex}`

      material.finishGroups.forEach((finishGroup, finishGroupIndex) => {
        finishGroup.id = `finishgroup-${groupIndex}-${materialIndex}-${finishGroupIndex}`
      })
    })
  })
}

export function hasMaterialMultipleConfigs (material) {
  return !material.finishGroups.every(
    finishGroup => (finishGroup.materialConfigs.length <= 1)
  )
}

export function getOffersForMaterialConfig (materialConfigId, price, models) {
  if (!price) {
    return []
  }

  const vendors = Object.keys(price.printingService)
    .map(name => ({name, ...price.printingService[name]}))

  const offers = vendors.reduce((acc, vendor) => ([
    ...acc,
    ...vendor.shipping.map(shipping => ({
      name: vendor.name,
      items: vendor.items.map((item, index) => ({
        ...item,
        quantity: models[price.items[index].modelId].quantity
      }))
      .filter((_, index) =>
        price.items[index].materialConfigId === materialConfigId
      ),
      shipping,
      vatPercentage: vendor.vatPercentage,
      currency: vendor.currency
    }))
  ]), [])

  // Filter for complete offers
  return offers.filter((offer) => {
    const isCompletelyPrintable = offer.items.reduce((last, cur) => last && cur.isPrintable, true)
    return isCompletelyPrintable && offer.items.length > 0
  })
}

export function getBestOfferForMaterialConfig (materialConfigId, price, models) {
  let bestOffer = null
  const offers = getOffersForMaterialConfig(materialConfigId, price, models)
  offers.forEach((offer) => {
    const offerPrice = getOfferAmount(offer)
    if (!bestOffer || bestOffer.price > offerPrice) {
      bestOffer = {
        offer,
        price: offerPrice
      }
    }
  })

  return bestOffer
}

export function getBestOfferForMaterial (material, price, models) {
  let bestOffer = null
  material.finishGroups.forEach((finishGroup) => {
    finishGroup.materialConfigs.forEach((materialConfig) => {
      const offer = getBestOfferForMaterialConfig(materialConfig.id, price, models)
      if (offer !== null && (!bestOffer || bestOffer.price > offer.price)) {
        bestOffer = offer
      }
    })
  })

  return bestOffer
}

export function getMaterialByName (materials, name) {
  let foundMaterial = null

  materials.materialStructure.forEach((materialGroup) => {
    materialGroup.materials.forEach((material) => {
      if (material.name === name) {
        foundMaterial = material
      }
    })
  })

  return foundMaterial
}
