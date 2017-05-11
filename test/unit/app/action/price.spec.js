import {
  selectOffer,
  refreshSelectedOffer,
  createPriceRequest,
  createDebouncedPriceRequest
} from 'Action/price'
import * as pollLib from 'Lib/poll'
import * as printingEngine from 'Lib/printing-engine'
import * as modalActions from 'Action/modal'
import {AppError} from 'Lib/error'
import TYPE, {ERROR_TYPE} from '../../../../src/app/type'

describe('Price actions', () => {
  let sandbox
  let initialStoreData
  let store

  beforeEach(() => {
    initialStoreData = {
      material: {
        materials: {
          materialConfigs: {
            material1: 'something',
            material2: 'something'
          }
        }
      },
      model: {
        models: [{
          modelId: 'model1',
          quantity: 1
        }, {
          modelId: 'model2',
          quantity: 2
        }]
      },
      price: {
        priceId: null
      },
      user: {
        userId: 'some-user-id'
      }
    }
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.spy(pollLib, 'poll')
    sandbox.spy(pollLib, 'debouncedPoll')
    pollLib.resetPollState()

    sandbox.stub(printingEngine)
    printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
    printingEngine.getPriceWithStatus.resolves({
      isComplete: true,
      price: {some: 'price'}
    })

    sandbox.stub(modalActions)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('selectOffer()', () => {
    it('dispatches expected actions', async () => {
      const offer = {some: 'offer'}
      await store.dispatch(selectOffer(offer))

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.SELECT_OFFER,
        payload: {offer}
      }])
    })
  })

  describe('refreshSelectedOffer()', () => {
    it('dispatches expected actions when offer is not available anymore', async () => {
      initialStoreData.price = {
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }, {
          materialConfigId: 2,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }],
        selectedOffer: {
          materialConfigId: 3,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }
      }
      store = mockStore(initialStoreData)

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.SELECT_OFFER,
        payload: {offer: null}
      }])
    })

    it('dispatches expected actions when no offers are available', async () => {
      initialStoreData.price = {
        offers: null,
        selectedOffer: {
          materialConfigId: 3,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }
      }
      store = mockStore(initialStoreData)

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.SELECT_OFFER,
        payload: {offer: null}
      }])
    })

    it('dispatches expected actions when selected offer is still valid', async () => {
      initialStoreData.price = {
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'},
          some: 'other'
        }],
        selectedOffer: {
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }
      }
      store = mockStore(initialStoreData)

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.SELECT_OFFER,
        payload: {
          offer: {
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'},
            some: 'other'
          }
        }
      }])
    })

    it('dispatches no action when there is no selected offer', async () => {
      initialStoreData.price = {
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }],
        selectedOffer: null
      }
      store = mockStore(initialStoreData)

      await store.dispatch(refreshSelectedOffer())

      expect(store.getActions(), 'to equal', [])
    })
  })

  describe('createPriceRequest()', () => {
    it('dispatches expected actions', async () => {
      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }, {
        type: TYPE.PRICE.REQUESTED,
        payload: {priceId: 'some-price-id'}
      }, {
        type: TYPE.PRICE.RECEIVED,
        payload: {price: {some: 'price'}}
      }])
    })

    it('aborts if there are not uploaded models', async () => {
      initialStoreData.model.models = []
      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }])
    })

    it('calls printingEngine.createPriceRequest() with expected options', async () => {
      await store.dispatch(createPriceRequest())

      const materialConfigIds = ['material1', 'material2']
      expect(printingEngine.createPriceRequest, 'to have a call satisfying', [{
        userId: 'some-user-id',
        items: [{
          modelId: 'model1',
          quantity: 1,
          materialConfigIds
        }, {
          modelId: 'model2',
          quantity: 2,
          materialConfigIds
        }]
      }])
    })

    it('calls printingEngine.createPriceRequest() with last price id', async () => {
      initialStoreData.price.priceId = 'last-price-id'
      await store.dispatch(createPriceRequest())

      const materialConfigIds = ['material1', 'material2']
      expect(printingEngine.createPriceRequest, 'to have a call satisfying', [{
        userId: 'some-user-id',
        lastPriceId: 'last-price-id',
        items: [{
          modelId: 'model1',
          quantity: 1,
          materialConfigIds
        }, {
          modelId: 'model2',
          quantity: 2,
          materialConfigIds
        }]
      }])
    })

    it('calls poll lib', async () => {
      await store.dispatch(createPriceRequest())

      expect(pollLib.poll, 'to have a call satisfying', [
        'price',
        expect.it('to be a', 'function'),
        expect.it('to be a', 'function')
      ])
    })

    it('dispatches expected actions when polling failes with fatal error', async () => {
      const error = new Error('some-error')
      pollLib.poll.restore()
      sinon.stub(pollLib, 'poll').rejects(error)

      modalActions.openFatalErrorModal
        .withArgs(error)
        .returns({
          type: 'some-fatal-error-modal',
          payload: undefined
        })

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }, {
        type: TYPE.PRICE.RECEIVED,
        payload: error,
        error: true
      }, {
        type: 'some-fatal-error-modal',
        payload: undefined
      }])
    })

    it('dispatches expected actions when polling failes with ERROR_TYPE.POLL_OVERWRITTEN', async () => {
      const error = new AppError(ERROR_TYPE.POLL_OVERWRITTEN, 'some error')
      pollLib.poll.restore()
      sinon.stub(pollLib, 'poll').rejects(error)

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }])
    })
  })

  describe('createDebouncedPriceRequest()', () => {
    it('calls debounced version of poll lib', async () => {
      pollLib.debouncedPoll.restore()
      sinon.stub(pollLib, 'debouncedPoll').resolves()

      await store.dispatch(createDebouncedPriceRequest())

      expect(pollLib.debouncedPoll, 'to have a call satisfying', [
        'price',
        expect.it('to be a', 'function'),
        expect.it('to be a', 'function')
      ])
    })
  })
})
