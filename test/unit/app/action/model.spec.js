import {
  changeQuantity,
  changeIndividualQuantity
} from 'Action/model'
import * as priceActions from 'Action/price'
import TYPE from '../../../../src/app/type'
import {createAsyncThunk} from '../../../helper'

describe('Model actions', () => {
  let initialStoreData
  let store

  beforeEach(() => {
    initialStoreData = {
    }
    store = mockStore(initialStoreData)

    sinon.stub(priceActions, 'createDebouncedPriceRequest')
  })

  afterEach(() => {
    priceActions.createDebouncedPriceRequest.restore()
  })

  describe('changeQuantity()', () => {
    it('dispatches expected actions', async () => {
      priceActions.createDebouncedPriceRequest
        .withArgs()
        .returns(createAsyncThunk('some-create-debounced-price-request'))

      await store.dispatch(changeQuantity({quantity: 123}))
      expect(store.getActions(), 'to equal', [{
        type: TYPE.MODEL.QUANTITIY_CHANGED,
        payload: {quantity: 123}
      }, {
        type: 'some-create-debounced-price-request'
      }])
    })
  })

  describe('changeIndividualQuantity()', () => {
    it('dispatches expected actions', async () => {
      priceActions.createDebouncedPriceRequest
        .withArgs()
        .returns(createAsyncThunk('some-create-debounced-price-request'))

      await store.dispatch(changeIndividualQuantity({modelId: 'some-id', quantity: 123}))
      expect(store.getActions(), 'to equal', [{
        type: TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED,
        payload: {modelId: 'some-id', quantity: 123}
      }, {
        type: 'some-create-debounced-price-request'
      }])
    })
  })
})
