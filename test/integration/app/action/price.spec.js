import {createPriceRequest} from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import TYPE from '../../../../src/app/type'

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
          models: [{
            modelId: 'material-id-model-1'
          }, {
            modelId: 'material-id-model-2'
          }]
        },
        material: {
          materials: {
            'some-material-id': 'something',
            'some-material-other-id': 'something'
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
      printingEngine.getPriceStatus.resolves(true)  // Finished polling
      printingEngine.getPrice.resolves('some-price')

      store.dispatch(createPriceRequest())
      await actionFinished(store, TYPE.PRICE.RECEIVED)

      // The cross product of all combinations
      expect(printingEngine.createPriceRequest, 'was called with', {
        userId: 'some-user-id',
        items: [{
          modelId: 'material-id-model-1',
          materialId: 'some-material-id'
        }, {
          modelId: 'material-id-model-2',
          materialId: 'some-material-id'
        }, {
          modelId: 'material-id-model-1',
          materialId: 'some-material-other-id'
        }, {
          modelId: 'material-id-model-2',
          materialId: 'some-material-other-id'
        }]
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        price: 'some-price'
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
          price: null
        })
      }
    })
  })
})
