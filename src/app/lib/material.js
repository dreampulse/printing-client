import {
  getPriceAmount
} from 'Lib/get-total-amount'

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

export function getOffersForMaterialConfig (materialConfigId, price) {
  if (!price) {
    return []
  }

  const vendors = Object.keys(price.printingService)
    .map(name => ({name, ...price.printingService[name]}))

  const offers = vendors.reduce((acc, vendor) => ([
    ...acc,
    ...vendor.shipping.map(shipping => ({
      name: vendor.name,
      items: vendor.items.filter((_, index) =>
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

export function getBestOfferForMaterialConfig (materialConfigId, price) {
  let bestOffer = null
  const offers = getOffersForMaterialConfig(materialConfigId, price)
  offers.forEach((offer) => {
    const offerPrice = getPriceAmount(offer)
    if (!bestOffer || bestOffer.price > offerPrice) {
      bestOffer = {
        offer,
        price: offerPrice
      }
    }
  })

  return bestOffer
}

export function getBestOfferForMaterial (material, price) {
  let bestOffer = null
  material.finishGroups.forEach((finishGroup) => {
    finishGroup.materialConfigs.forEach((materialConfig) => {
      const offer = getBestOfferForMaterialConfig(materialConfig.id, price)
      if (offer !== null && (!bestOffer || bestOffer.price > offer.price)) {
        bestOffer = offer
      }
    })
  })

  return bestOffer
}
