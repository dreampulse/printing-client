import {
  selectOffer,
  createPriceRequest,
  createDebouncedPriceRequest
} from 'Action/price'
import * as pollLib from 'Lib/poll'
import * as printingEngine from 'Lib/printing-engine'
import TYPE from '../../../../src/app/type'

describe('Price actions', () => {
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
        models: {
          model1: {quantity: 1},
          model2: {quantity: 2}
        }
      },
      price: {
        priceId: null
      },
      user: {
        userId: 'some-user-id'
      }
    }
    store = mockStore(initialStoreData)

    sinon.spy(pollLib, 'poll')
    sinon.spy(pollLib, 'debouncedPoll')
    pollLib.resetPollState()

    sinon.stub(printingEngine)
    printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
    printingEngine.getPriceWithStatus.resolves({
      isComplete: true,
      price: {some: 'price'}
    })
  })

  afterEach(() => {
    pollLib.poll.restore()
    pollLib.debouncedPoll.restore()

    sinon.restore(printingEngine)
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

    it('dispatches expected actions when polling failes', async () => {
      const error = new Error('some-error')
      pollLib.poll.restore()
      sinon.stub(pollLib, 'poll').rejects(error)

      await store.dispatch(createPriceRequest())

      expect(store.getActions(), 'to equal', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }, {
        type: TYPE.PRICE.RECEIVED,
        payload: error,
        error: true
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
