import createHistory from 'history/createMemoryHistory'
import {createPriceRequest, refreshSelectedOffer} from 'Action/price'
import * as printingEngine from 'Lib/printing-engine'

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
          offers: [
            {
              materialConfigId: 1,
              printingService: 'some-service',
              shipping: {name: 'some-shipping'}
            }
          ],
          selectedOffer: {
            materialConfigId: 2,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }
        }
      }
    })

    it('refreshes selected offer', async () => {
      store = createLegacyStore(createHistory(), state)
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
          offers: [
            {
              materialConfigId: 3,
              printingService: 'some-service',
              shipping: {name: 'some-shipping'}
            }
          ],
          printingServiceComplete: null,
          priceId: 'some-old-price-id',
          selectedOffer: {
            materialConfigId: 3,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }
        },
        model: {
          models: [
            {
              modelId: 'material-id-model-1',
              quantity: 1,
              uploadFinished: true
            },
            {
              modelId: 'material-id-model-2',
              quantity: 2,
              uploadFinished: true
            }
          ]
        },
        material: {
          materials: {
            materialStructure: [
              {
                materials: [
                  {
                    id: 'some-material-1',
                    finishGroups: [
                      {
                        materialConfigs: [
                          {
                            id: 'material-config-1'
                          },
                          {
                            id: 'material-config-2'
                          }
                        ]
                      },
                      {
                        materialConfigs: [
                          {
                            id: 'material-config-3'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          selectedMaterial: 'some-material-1'
        },
        user: {
          userId: 'some-user-id'
        }
      }

      printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: [
            {
              materialConfigId: 1,
              printingService: 'some-service',
              shipping: {name: 'some-shipping'}
            },
            {
              materialConfigId: 2,
              printingService: 'some-service',
              shipping: {name: 'some-shipping'}
            }
          ],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })
    })

    it('handles price request and updates selected offer', async () => {
      store = createLegacyStore(createHistory(), state)
      await store.dispatch(createPriceRequest())

      expect(printingEngine.createPriceRequest, 'was called with', {
        userId: 'some-user-id',
        items: [
          {
            modelId: 'material-id-model-1',
            materialConfigIds: ['material-config-1', 'material-config-2', 'material-config-3'],
            quantity: 1
          },
          {
            modelId: 'material-id-model-2',
            materialConfigIds: ['material-config-1', 'material-config-2', 'material-config-3'],
            quantity: 2
          }
        ]
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        offers: [
          {
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          },
          {
            materialConfigId: 2,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }
        ],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        },
        selectedOffer: null
      })
    })

    it('handles fatal error when polling', () => {
      const error = new Error('some-error')
      printingEngine.getPriceWithStatus.rejects(error)

      store = createLegacyStore(createHistory(), state)
      return store.dispatch(createPriceRequest()).catch(() => {
        expect(store.getState().price, 'to satisfy', {
          priceId: null,
          offers: null,
          printingServiceComplete: null,
          selectedOffer: null,
          error
        })
      })
    })
  })
})
