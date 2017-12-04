import {
  selectOffer,
  refreshSelectedOffer,
  createPriceRequest,
  recalculateSelectedOffer,
  createDebouncedPriceRequest
} from 'Action/price'
import * as pollLib from 'Lib/poll'
import * as printingEngine from 'Lib/printing-engine'
import * as modalActions from 'Action/modal'
import {AppError} from 'Lib/error'
import config from '../../../../config'
import TYPE, {ERROR_TYPE} from '../../../../src/app/action-type'

describe('Price actions', () => {
  const material = {
    materials: {
      materialStructure: [
        {
          materials: [
            {
              id: 'material-1',
              finishGroups: [
                {
                  materialConfigs: [
                    {
                      id: 'material-config-1'
                    }
                  ]
                }
              ]
            },
            {
              id: 'material-2',
              finishGroups: [
                {
                  materialConfigs: [
                    {
                      id: 'material-config-2'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    selectedMaterial: 'material-1'
  }
  const model = {
    models: [
      {
        modelId: 'model-1',
        quantity: 1,
        uploadFinished: true
      },
      {
        modelId: 'model-2',
        quantity: 2,
        uploadFinished: true
      }
    ]
  }
  const user = {
    userId: 'user-1'
  }
  const offer1 = {
    materialConfigId: 'material-config-1',
    printingService: 'service-1',
    shipping: {
      name: 'some-shipping'
    }
  }
  const offer2 = {
    materialConfigId: 'material-config-1',
    printingService: 'service-2',
    shipping: {
      name: 'some-shipping'
    }
  }
  const offer3 = {
    materialConfigId: 'material-config-2',
    printingService: 'service-1',
    shipping: {
      name: 'some-shipping'
    }
  }
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    // Speed up failing tests
    sandbox.stub(config, 'pollingInterval').value(0)
    sandbox.stub(config, 'pollingRetries').value(2)

    sandbox.stub(printingEngine)
    sandbox.stub(modalActions)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('selectOffer()', () => {
    it('dispatches expected actions', async () => {
      const store = mockStore()
      await store.dispatch(selectOffer(offer1))

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.SELECT_OFFER,
          payload: {offer: offer1}
        }
      ])
    })
  })

  describe('refreshSelectedOffer()', () => {
    it('dispatches expected actions when offer is not available anymore', async () => {
      const store = mockStore({
        price: {
          offers: [offer1, offer2],
          selectedOffer: offer3
        }
      })

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.SELECT_OFFER,
          payload: {offer: null}
        }
      ])
    })

    it('dispatches expected actions when no offers are available', async () => {
      const store = mockStore({
        price: {
          offers: [],
          selectedOffer: offer1
        }
      })

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.SELECT_OFFER,
          payload: {offer: null}
        }
      ])
    })

    it('dispatches expected actions when selected offer is still valid', async () => {
      const store = mockStore({
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.SELECT_OFFER,
          payload: {
            offer: offer1
          }
        }
      ])
    })

    it('dispatches no action when there is no selected offer', async () => {
      const store = mockStore({
        price: {
          offers: [offer1],
          selectedOffer: null
        }
      })

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [])
    })
  })

  describe('createPriceRequest()', () => {
    it('dispatches expected actions', async () => {
      const price1 = {}
      const price2 = {}
      const price3 = {}
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.onFirstCall().resolves({price: price1, isComplete: false})
      printingEngine.getPriceWithStatus.onSecondCall().resolves({price: price2, isComplete: false})
      printingEngine.getPriceWithStatus.onThirdCall().resolves({price: price3, isComplete: true})

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        },
        {
          type: TYPE.PRICE.REQUESTED,
          payload: {priceId: 'price-1'}
        },
        {
          type: TYPE.PRICE.RECEIVED,
          payload: {
            price: price1,
            isComplete: false
          }
        },
        {
          type: TYPE.PRICE.RECEIVED,
          payload: {
            price: price2,
            isComplete: false
          }
        },
        {
          type: TYPE.PRICE.RECEIVED,
          payload: {
            price: price3,
            isComplete: true
          }
        }
      ])
    })

    it('calls printingEngine.createPriceRequest() with the expected arguments', async () => {
      const price = {}
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.resolves({price, isComplete: true})

      await store.dispatch(createPriceRequest())

      expect(printingEngine.createPriceRequest, 'to have a call satisfying', [
        {
          isEstimate: false,
          caching: true,
          userId: 'user-1',
          items: [
            {
              modelId: 'model-1',
              quantity: 1,
              materialConfigIds: ['material-config-1']
            },
            {
              modelId: 'model-2',
              quantity: 2,
              materialConfigIds: ['material-config-1']
            }
          ]
        }
      ])
    })

    it('calls printingEngine.createPriceRequest() with the refresh option if requested', async () => {
      const price = {}
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        },
        routing: {
          location: {
            search: 'feature:refresh'
          }
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.resolves({price, isComplete: true})

      await store.dispatch(createPriceRequest())

      expect(printingEngine.createPriceRequest, 'to have a call satisfying', [
        {
          refresh: true
        }
      ])
    })

    it('calls printingEngine.getPriceWithStatus() with the expected arguments', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.resolves({price: {}, isComplete: true})

      await store.dispatch(createPriceRequest())

      expect(printingEngine.getPriceWithStatus, 'to have a call satisfying', [
        {
          priceId: 'price-1'
        }
      ])
    })

    it('aborts if there are no uploaded models', async () => {
      const store = mockStore({
        material,
        user,
        model: {
          models: []
        },
        price: {
          offers: null
        }
      })

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        }
      ])
    })

    it('stops price polling if there are no uploaded models', async () => {
      const store = mockStore({
        material,
        user,
        model: {
          models: []
        },
        price: {
          offers: null
        }
      })
      sandbox.spy(pollLib, 'stopPoll')

      await store.dispatch(createPriceRequest())

      expect(pollLib.stopPoll, 'to have a call satisfying', ['price'])
    })

    it('dispatches expected actions when polling fails with fatal error', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      const errorModalAction = {
        type: 'some-fatal-error-modal',
        payload: undefined
      }
      sandbox.stub(pollLib, 'poll').rejects(new Error('some-error'))
      modalActions.openFatalErrorModal.returns(errorModalAction)

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        },
        errorModalAction
      ])
    })

    it('dispatches expected actions when polling failes with ERROR_TYPE.POLL_OVERWRITTEN', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      sandbox.stub(pollLib, 'poll').rejects(new AppError(ERROR_TYPE.POLL_OVERWRITTEN, 'some error'))

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        }
      ])
    })

    it('dispatches expected actions when polling has been stopped with ERROR_TYPE.POLL_STOPPED', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      sandbox.stub(pollLib, 'poll').rejects(new AppError(ERROR_TYPE.POLL_STOPPED, 'some error'))

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        }
      ])
    })

    it('dispatches expected actions when polling has been stopped with ERROR_TYPE.POLL_TIMEOUT', async () => {
      const pollTimeoutError = new AppError(ERROR_TYPE.POLL_TIMEOUT, 'some error')
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      sandbox.stub(pollLib, 'poll').rejects(pollTimeoutError)

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.CLEAR_OFFERS,
          payload: undefined
        },
        {
          type: TYPE.PRICE.TIMEOUT,
          payload: pollTimeoutError,
          error: true
        }
      ])
    })
  })

  describe('recalculateSelectedOffer()', () => {
    it('stops current "price" polls', async () => {
      const store = mockStore({
        material,
        user,
        model: {
          models: []
        },
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })
      sandbox.stub(pollLib, 'poll').resolves()
      sandbox.spy(pollLib, 'stopPoll')

      await store.dispatch(recalculateSelectedOffer())

      expect(pollLib.stopPoll, 'to have a call satisfying', ['price'])
    })

    it('dispatches expected actions', async () => {
      const price1 = {
        offers: []
      }
      const price2 = {
        offers: [offer2]
      }
      const price3 = {
        offers: [offer2, offer1]
      }
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.onFirstCall().resolves({price: price1})
      printingEngine.getPriceWithStatus.onSecondCall().resolves({price: price2})
      printingEngine.getPriceWithStatus.onThirdCall().resolves({price: price3})

      await store.dispatch(recalculateSelectedOffer())

      expect(store.getActions(), 'to equal', [
        {
          type: TYPE.PRICE.REQUESTED,
          payload: {priceId: 'price-1'}
        },
        {
          type: TYPE.PRICE.SELECT_OFFER,
          payload: {offer: offer1}
        }
      ])
    })

    it('calls printingEngine.createPriceRequest() with the expected arguments', async () => {
      const price = {
        offers: [offer1]
      }
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.resolves({price})

      await store.dispatch(recalculateSelectedOffer())

      expect(printingEngine.createPriceRequest, 'to have a call satisfying', [
        {
          isEstimate: false,
          caching: false,
          vendorId: 'service-1',
          userId: 'user-1',
          items: [
            {
              modelId: 'model-1',
              quantity: 1,
              materialConfigIds: ['material-config-1']
            },
            {
              modelId: 'model-2',
              quantity: 2,
              materialConfigIds: ['material-config-1']
            }
          ]
        }
      ])
    })

    it('calls printingEngine.getPriceWithStatus() with the expected arguments', async () => {
      const price = {
        offers: [offer1]
      }
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })
      printingEngine.createPriceRequest.resolves({priceId: 'price-1'})
      printingEngine.getPriceWithStatus.resolves({price})

      await store.dispatch(recalculateSelectedOffer())

      expect(printingEngine.getPriceWithStatus, 'to have a call satisfying', [{priceId: 'price-1'}])
    })

    it('dispatches expected actions when polling fails with fatal error', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: [offer1],
          selectedOffer: offer1
        }
      })
      const errorModalAction = {
        type: 'some-fatal-error-modal',
        payload: undefined
      }
      sandbox.stub(pollLib, 'poll').rejects(new Error('some-error'))
      modalActions.openFatalErrorModal.returns(errorModalAction)

      await store.dispatch(recalculateSelectedOffer())

      expect(store.getActions(), 'to equal', [errorModalAction])
    })
  })

  describe('createDebouncedPriceRequest()', () => {
    it('calls debounced version of poll lib', async () => {
      const store = mockStore({
        material,
        model,
        user,
        price: {
          offers: null
        }
      })
      sandbox.stub(pollLib, 'debouncedPoll').resolves()

      await store.dispatch(createDebouncedPriceRequest())

      expect(pollLib.debouncedPoll, 'to have a call satisfying', [
        'price',
        expect.it('to be a', 'function'),
        expect.it('to be a', 'function')
      ])
    })
  })
})
