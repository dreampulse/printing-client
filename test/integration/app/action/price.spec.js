import {createPriceRequest, pollFinalPrice} from '../../../../src/app/action/price'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

import config from '../../../../config'

describe('Price Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('createPriceRequest()', () => {
    let state

    beforeEach(() => {
      state = {
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
      }

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
      })
    })

    it('does not trigger a price request when no models have been uploaded', async () => {
      state.model.models = {}
      store = Store(state)
      await store.dispatch(createPriceRequest())

      expect(printingEngine.createPriceRequest, 'was not called')
    })

    it('works if shipping address is set', async () => {
      store = Store(state)
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
        },
        pollCountdown: 100  // Expect that the poll count will be reset
      })
    })

    it('updates offer if applicable', async () => {
      store = Store({
        ...state,
        cart: {
          selectedOffer: {
            materialConfigId: 'some-config-id',
            printingService: 'some-printing-service',
            shipping: {
              name: 'some-shipping'
            }
          }
        }
      })

      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: [{
            THIS_IS_A_OFFER: 'A',
            materialConfigId: 'some-config-id',
            printingService: 'some-printing-service',
            shipping: {
              name: 'some-shipping'
            }
          }],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })

      await store.dispatch(createPriceRequest())

      expect(store.getState().cart.selectedOffer, 'to equal', {
        THIS_IS_A_OFFER: 'A',
        materialConfigId: 'some-config-id',
        printingService: 'some-printing-service',
        shipping: {
          name: 'some-shipping'
        }
      })
    })

    it('does not send request if shipping address is not set', async () => {
      store = Store({})

      try {
        await store.dispatch(createPriceRequest())
      } catch (e) {
        expect(printingEngine.createPriceRequest, 'was not called')
        expect(store.getState().price, 'to equal', {
          priceId: null,
          offers: null,
          pollCountdown: 100,
          printingServiceComplete: null
        })
      }
    })
  })

  describe('pollFinalPrice()', () => {
    let sandbox
    let somePrice

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      sandbox.stub(config, 'pollingInverval', 1)  // Faster polling

      store = Store({
        price: {
          priceId: 'some-price-id',
          pollCountdown: 10
        }
      })

      somePrice = {
        offers: ['some-offer'],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        }
      }
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('works if getPrice is completed', async () => {
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: somePrice
      })

      await store.dispatch(pollFinalPrice())
      expect(store.getState().price, 'to equal', {
        priceId: 'some-price-id',
        pollCountdown: 10,
        offers: ['some-offer'],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        },
        error: false
      })
    })

    it('polls 10 times until the countdown is 0', async () => {
      printingEngine.getPriceWithStatus.resolves({
        isComplete: false,
        price: somePrice
      })

      try {
        await store.dispatch(pollFinalPrice())
      } catch (e) {
        expect(store.getState().price, 'to equal', {
          priceId: 'some-price-id',
          offers: ['some-offer'],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          },
          pollCountdown: 0,  // Reduced to 0
          error: true
        })

        expect(printingEngine.getPriceWithStatus, 'was called times', 10)
      }
    })
  })
})
