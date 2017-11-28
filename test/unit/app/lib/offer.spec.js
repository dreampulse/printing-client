import {getUpdatedOffer} from 'Lib/offer'

describe('Offer unit tests', () => {
  describe('getUpdatedOffer()', () => {
    it('works for a default input', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service'
      }
      const offers = [
        {
          materialConfigId: 'other-config-id',
          printingService: 'other-printing-service'
        },
        {
          materialConfigId: 'some-config-id',
          printingService: 'some-printing-service'
        }
      ]

      expect(getUpdatedOffer(selectedOffer, offers), 'to be', offers[1])
    })

    it('returns the first match for the given materialConfigId and the printingService', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service'
      }
      const offers = [
        {
          materialConfigId: 'some-config-id',
          printingService: 'some-printing-service',
          shipping: {
            name: 'dhl'
          }
        },
        {
          materialConfigId: 'some-config-id',
          printingService: 'some-printing-service',
          shipping: {
            name: 'other'
          }
        }
      ]

      expect(getUpdatedOffer(selectedOffer, offers), 'to be', offers[0])
    })

    it('returns null for no match', () => {
      const selectedOffer = {
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service'
      }
      const offers = [
        {
          materialConfigId: 'some-config-id-2',
          printingService: 'some-printing-service'
        }
      ]

      expect(getUpdatedOffer(selectedOffer, offers), 'to be', null)
    })
  })
})
