import {
  createPriceRequest,
  refreshSelectedOffer
} from 'Action/price'
import * as printingEngine from 'Lib/printing-engine'
import Store from '../../../../src/app/store'

describe('Price Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('refreshSelectedOffer()', () => {
    let state

    beforeEach(() => {
      state = {
        price: {
          offers: [{
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }],
          selectedOffer: {
            materialConfigId: 2,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }
        }
      }
    })

    it('refreshes selected offer', async () => {
      store = Store(state)
      await store.dispatch(refreshSelectedOffer())

      expect(store.getState().price, 'to satisfy', {
        selectedOffer: null
      })
    })
  })

  describe('createPriceRequest()', () => {
    let state

    beforeEach(() => {
      state = {
        price: {
          offers: [{
            materialConfigId: 3,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }],
          printingServiceComplete: null,
          priceId: 'some-old-price-id',
          selectedOffer: {
            materialConfigId: 3,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }
        },
        model: {
          models: [{
            modelId: 'material-id-model-1',
            quantity: 1
          }, {
            modelId: 'material-id-model-2',
            quantity: 2
          }]
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
          userId: 'some-user-id'
        }
      }

      printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: [{
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }, {
            materialConfigId: 2,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })
    })

    it('handles price request and updates selected offer', async () => {
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
        }],
        lastPriceId: 'some-old-price-id'
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }, {
          materialConfigId: 2,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        },
        selectedOffer: null
      })
    })

    it('handles fatal error when polling', async () => {
      const error = new Error('some-error')
      printingEngine.getPriceWithStatus.rejects(error)

      store = Store(state)
      await store.dispatch(createPriceRequest())

      expect(store.getState().price, 'to satisfy', {
        priceId: null,
        offers: null,
        printingServiceComplete: null,
        selectedOffer: null,
        error
      })

      expect(store.getState().modal.isOpen, 'to be', true)
    })
  })
})
