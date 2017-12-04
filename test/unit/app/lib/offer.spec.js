import {getUpdatedOffer} from 'Lib/offer'

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

    it('retuns null for no match', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id',
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
  })
})
