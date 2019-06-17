import keyBy from 'lodash/keyBy'
import flatMap from 'lodash/flatMap'

import {
  MaterialId,
  MultiModelQuote,
  ShippingId,
  Shipping,
  Offer,
  FinishGroupId,
  MaterialConfig,
  MaterialConfigId,
  MaterialGroupId
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

export function getBestMultiModelOffers(
  quotes: MultiModelQuote[],
  usedShippingIds: ShippingId[],
  shippings: Shipping[],
  materialConfigs: {[materialConfigId: string]: MaterialConfig},
  filterBy: {
    materialConfigId?: MaterialConfigId
    finishGroupId?: FinishGroupId
    materialId?: MaterialId
    materialGroupId?: MaterialGroupId
  } = {}
): Offer[] {
  const selectedQuotes = quotes.filter(
    quote =>
      quote.isPrintable &&
      (!filterBy.materialConfigId || quote.materialConfigId === filterBy.materialConfigId) &&
      (!filterBy.finishGroupId ||
        materialConfigs[quote.materialConfigId].finishGroupId === filterBy.finishGroupId) &&
      (!filterBy.materialId ||
        materialConfigs[quote.materialConfigId].materialId === filterBy.materialId) &&
      (!filterBy.materialGroupId ||
        materialConfigs[quote.materialConfigId].materialGroupId === filterBy.materialGroupId)
  )
  return getSortedMultiModelOffers(selectedQuotes, usedShippingIds, shippings)
}

export function isSameOffer(offer1: Offer, offer2: Offer) {
  return (
    offer1.multiModelQuote.materialConfigId === offer2.multiModelQuote.materialConfigId &&
    offer1.shipping.shippingId === offer2.shipping.shippingId
  )
}
