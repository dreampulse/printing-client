import {
  reviewOrder
} from 'Action/user'
import * as priceActions from 'Action/price'
import * as modalActions from 'Action/modal'
import * as navigationActions from 'Action/navigation'
import * as printingEngine from 'Lib/printing-engine'
import * as normalize from 'Lib/normalize'
import TYPE from '../../../../src/app/type'
import {resolveAsyncThunk, createMockStore} from '../../../helper'

describe('User actions', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(priceActions)
    sandbox.stub(modalActions)
    sandbox.stub(navigationActions)
    sandbox.stub(printingEngine)
    sandbox.stub(normalize)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('reviewOrder()', () => {
    let initialState
    let nextStates
    let store

    beforeEach(() => {
      initialState = {
        user: {
          user: {
            userId: 'some-user-id',
            shippingAddress: 'some-old-address'
          }
        },
        price: {
          selectedOffer: {
            totalPrice: 100,
            priceEstimated: false
          }
        }
      }
      nextStates = []
      store = createMockStore(initialState, nextStates)

      priceActions.recalculateSelectedOffer
        .withArgs()
        .returns(resolveAsyncThunk('some-recalculate-selected-offer-action'))

      modalActions.openFetchingPriceModal
        .withArgs()
        .returns(resolveAsyncThunk('some-open-fetching-price-modal'))

      modalActions.openPriceChangedModal
        .withArgs()
        .returns(resolveAsyncThunk('some-open-price-changed-modal'))

      modalActions.openPriceLocationChangedModal
        .withArgs()
        .returns(resolveAsyncThunk('some-open-price-location-changed-modal'))

      navigationActions.goToCart
        .withArgs()
        .returns(resolveAsyncThunk('some-go-to-cart'))

      printingEngine.updateUser
        .withArgs('some-user-id', {some: 'user-data'})
        .resolves()

      normalize.normalizeTelephoneNumber
        .withArgs('some-phone-number')
        .returns(undefined)
    })

    it('dispatches expected actions', async () => {
      await store.dispatch(reviewOrder({some: 'user-data', phoneNumber: 'some-phone-number'}))
      expect(store.getActions(), 'to equal', [{
        type: 'some-open-fetching-price-modal'
      }, {
        type: TYPE.USER.UPDATED,
        payload: {some: 'user-data'}
      }, {
        type: 'some-recalculate-selected-offer-action'
      }, {
        type: 'some-go-to-cart'
      }])
    })

    it('dispatches expected actions when selected offer had an estimated price', async () => {
      initialState.price.selectedOffer.priceEstimated = true

      await store.dispatch(reviewOrder({some: 'user-data', phoneNumber: 'some-phone-number'}))
      expect(store.getActions(), 'to equal', [{
        type: 'some-open-fetching-price-modal'
      }, {
        type: TYPE.USER.UPDATED,
        payload: {some: 'user-data'}
      }, {
        type: 'some-recalculate-selected-offer-action'
      }, {
        type: 'some-open-price-changed-modal'
      }])
    })

    it('dispatches expected actions when price changed', async () => {
      nextStates.push({
        type: 'some-recalculate-selected-offer-action',
        state: {
          ...initialState,
          price: {
            selectedOffer: {
              totalPrice: 200,
              priceEstimated: false
            }
          }
        }
      })

      await store.dispatch(reviewOrder({some: 'user-data', phoneNumber: 'some-phone-number'}))
      expect(store.getActions(), 'to equal', [{
        type: 'some-open-fetching-price-modal'
      }, {
        type: TYPE.USER.UPDATED,
        payload: {some: 'user-data'}
      }, {
        type: 'some-recalculate-selected-offer-action'
      }, {
        type: 'some-open-price-location-changed-modal'
      }])
    })
  })
})
