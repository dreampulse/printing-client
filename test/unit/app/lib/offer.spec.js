import {getUpdatedOffer, getCheapestOfferFor} from 'Lib/offer'

describe('Offer unit tests', () => {
  describe('getUpdatedOffer()', () => {
    it('works for a default input', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service',
        shipping: {
          name: 'some-shipping'
        }
      }
      const offers = [
        {
          materialConfigId: 'some-config-id',
          printingService: 'some-printing-service',
          shipping: {
            name: 'some-shipping'
          }
        }
      ]

      expect(getUpdatedOffer(selectedOffer, offers), 'to be', offers[0])
    })

    it('returns null for no match', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id-1',
        printingService: 'some-printing-service',
        shipping: {
          name: 'some-shipping'
        }
      }
      const offers = [
        {
          materialConfigId: 'some-config-id-2',
          printingService: 'some-printing-service',
          shipping: {
            name: 'some-shipping'
          }
        }
      ]

      expect(getUpdatedOffer(selectedOffer, offers), 'to be', null)
    })

    it('returns null when the given offers array is empty', () => {
      expect(
        getUpdatedOffer(
          {
            materialConfigId: 'some-config-id-1',
            printingService: 'some-printing-service',
            shipping: {
              name: 'some-shipping'
            }
          },
          []
        ),
        'to be',
        null
      )
    })
  })

  describe('getCheapestOfferFor()', () => {
    it('returns the cheapest offer for the given materialConfigId and printingService', () => {
      const baseOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service'
      }
      const offers = [
        {
          ...baseOffer,
          totalPrice: 20.12
        },
        {
          ...baseOffer,
          totalPrice: 18.21
        },
        {
          ...baseOffer,
          totalPrice: 18.2
        }
      ]

      expect(
        getCheapestOfferFor('some-config-id', 'some-printing-service', offers),
        'to be',
        // implicit check if offers array has not been modified by sort()
        offers[2]
      )
    })

    it('returns null if there is no offer for the given materialConfigId and printingService', () => {
      const baseOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service'
      }
      const offers = [
        {
          ...baseOffer,
          totalPrice: 20.12
        }
      ]

      expect(
        getCheapestOfferFor('other-config-id', 'other-printing-service', offers),
        'to be',
        null
      )
    })

    it('returns null when the given offers array is empty', () => {
      expect(getCheapestOfferFor('some-config-id', 'some-printing-service', []), 'to be', null)
    })
  })
})
