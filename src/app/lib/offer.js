// @flow

import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'

import type {Material, MaterialId, MultiModelQuote, ShippingId, Shipping, Offer} from '../type'

function getSortedMultiModelOffers(
  quotes: Array<MultiModelQuote>,
  usedShippingIds: Array<ShippingId>,
  shippings: Array<Shipping>
): Array<Offer> {
  const usedShippingIdsById = keyBy(usedShippingIds, id => id)
  const sortedQuotes = flatMap(
    (quotes: any), // Because flatMap is broken in flow
    multiModelQuote =>
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
  quotes: Array<MultiModelQuote>,
  usedShippingIds: Array<ShippingId>,
  shippings: Array<Shipping>,
  material: Material
): ?Offer {
  const materialConfigs = {}
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

export function getBestMultiModelOffersForMaterialConfig(
  quotes: Array<MultiModelQuote>,
  usedShippingIds: Array<ShippingId>,
  shippings: Array<Shipping>,
  materialConfigId: MaterialId
): Array<Offer> {
  const multiModelQuotesForSelectedMaterialConfigId = quotes.filter(
    quote => quote.isPrintable && quote.materialConfigId === materialConfigId
  )
  return getSortedMultiModelOffers(
    multiModelQuotesForSelectedMaterialConfigId,
    usedShippingIds,
    shippings
  )
}
