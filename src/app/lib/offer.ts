import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'

import {
  Material,
  MaterialId,
  MultiModelQuote,
  ShippingId,
  Shipping,
  Offer,
  FinishGroup,
  MaterialConfig
} from '../type'

function getSortedMultiModelOffers(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[]
): Offer[] {
  const usedShippingIdsById = keyBy(usedShippingIds, id => id)
  const sortedQuotes = flatMap(quotes, multiModelQuote =>
    shippings
      .filter(shipping => shipping.vendorId === multiModelQuote.vendorId)
      .map(shipping => ({
        multiModelQuote,
        shipping,
        totalGrossPrice:
          multiModelQuote.grossPrice +
          (usedShippingIdsById[shipping.shippingId]
            ? 0 // No additional costs if shipping method is already in cart
            : shipping.grossPrice)
      }))
  ).sort((a, b) => a.totalGrossPrice - b.totalGrossPrice)
  return sortedQuotes
}

export function getBestMultiModelOfferForMaterial(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[],
  material: Material
): Offer {
  const materialConfigs: {[materialConfigId: string]: boolean} = {}
  material.finishGroups.forEach(finishGroup => {
    finishGroup.materialConfigs.forEach(materialConfig => {
      materialConfigs[materialConfig.id] = true
    })
  })
  const multiModelQuotesForSelectedMaterial = quotes.filter(
    quote => quote.isPrintable && materialConfigs[quote.materialConfigId]
  )
  const [bestQuote] = getSortedMultiModelOffers(
    multiModelQuotesForSelectedMaterial,
    usedShippingIds,
    shippings
  )
  return bestQuote
}

// TODO: Test
// This is the same as `getBestMultiModelOfferForMaterial`
// just changes to the loop
export function getBestMultiModelOfferForFinishGroup(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[],
  finishGroup: FinishGroup
): Offer {
  const materialConfigs: {[materialConfigId: string]: boolean} = {}
  finishGroup.materialConfigs.forEach(materialConfig => {
    materialConfigs[materialConfig.id] = true
  })

  const multiModelQuotesForSelectedMaterial = quotes.filter(
    quote => quote.isPrintable && materialConfigs[quote.materialConfigId]
  )
  const [bestQuote] = getSortedMultiModelOffers(
    multiModelQuotesForSelectedMaterial,
    usedShippingIds,
    shippings
  )
  return bestQuote
}

// TODO: Test
// Temp solution
export function getBestMultiModelOfferForMaterialConfig(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[],
  materialConfig: MaterialConfig
): Offer {
  const multiModelQuotesForSelectedMaterial = quotes.filter(
    quote => quote.isPrintable && quote.materialConfigId === materialConfig.id
  )

  const [bestQuote] = getSortedMultiModelOffers(
    multiModelQuotesForSelectedMaterial,
    usedShippingIds,
    shippings
  )
  return bestQuote
}

export function getBestMultiModelOffersForMaterialConfig(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[],
  materialConfigId: MaterialId
): Offer[] {
  const multiModelQuotesForSelectedMaterialConfigId = quotes.filter(
    quote => quote.isPrintable && quote.materialConfigId === materialConfigId
  )
  return getSortedMultiModelOffers(
    multiModelQuotesForSelectedMaterialConfigId,
    usedShippingIds,
    shippings
  )
}

export function isSameOffer(offer1: Offer, offer2: Offer) {
  return (
    offer1.multiModelQuote.materialConfigId === offer2.multiModelQuote.materialConfigId &&
    offer1.shipping.shippingId === offer2.shipping.shippingId
  )
}
