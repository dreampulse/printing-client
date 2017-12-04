// @flow

import type {Offer} from 'App/type'

export const getUpdatedOffer = (selectedOffer: Offer, offers: Array<Offer>) =>
  offers.find(
    offer =>
      offer.materialConfigId === selectedOffer.materialConfigId &&
      offer.printingService === selectedOffer.printingService &&
      offer.shipping.name === selectedOffer.shipping.name
  ) || null

export const getCheapestOfferFor = (
  materialConfigId: string,
  printingService: string,
  offers: Array<Offer>
) => {
  const sortedOffers = offers.slice().sort((a, b) => a.totalPrice - b.totalPrice)
  return (
    sortedOffers.find(
      offer =>
        offer.materialConfigId === materialConfigId && offer.printingService === printingService
    ) || null
  )
}
