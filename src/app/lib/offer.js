// @flow

import type {Offer} from 'App/type'

export const getUpdatedOffer = (selectedOffer: Offer, offers: Array<Offer>) =>
  offers.find(
    offer =>
      offer.materialConfigId === selectedOffer.materialConfigId &&
      offer.printingService === selectedOffer.printingService &&
      offer.shipping.name === selectedOffer.shipping.name
  ) || null
