export const getUpdatedOffer = (selectedOffer, offers) =>
  offers.find(offer =>
    offer.materialConfigId === selectedOffer.materialConfigId &&
    offer.printingService === selectedOffer.printingService &&
    offer.shipping.name === selectedOffer.shipping.name) || null
