import {createPriceRequest} from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Price Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('createPriceRequest()', () => {
    it('should work if shipping address is set', async () => {
      store = Store({
        model: {
          models: {
            'material-id-model-1': {
              quantity: 1
            },
            'material-id-model-2': {
              quantity: 2
            }
          }
        },
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something',
              'some-material-other-id': 'something'
            },
            materialStructure: []
          }
        },
        user: {
          userId: 'some-user-id',
          user: {
            shippingAddress: {
              city: 'Pittsburgh',
              zipCode: '15234',
              stateCode: 'PA',
              countryCode: 'US'
            }
          }
        }
      })

      printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: ['some-offer-1', 'some-offer-2'],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })  // Finished polling

      await store.dispatch(createPriceRequest())

      expect(printingEngine.createPriceRequest, 'was called with', {
        userId: 'some-user-id',
        items: [{
          modelId: 'material-id-model-1',
          materialConfigIds: ['some-material-id', 'some-material-other-id'],
          quantity: 1
        }, {
          modelId: 'material-id-model-2',
          materialConfigIds: ['some-material-id', 'some-material-other-id'],
          quantity: 2
        }]
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        offers: ['some-offer-1', 'some-offer-2'],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        }
      })
    })

    it('should not send request if shipping address is not set', async () => {
      store = Store({})

      try {
        await store.dispatch(createPriceRequest())
      } catch (e) {
        expect(printingEngine.createPriceRequest, 'was not called')
        expect(store.getState().price, 'to equal', {
          priceId: null,
          offers: null,
          printingServiceComplete: null
        })
      }
    })
  })
})
