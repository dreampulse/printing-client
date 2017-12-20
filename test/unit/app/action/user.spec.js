import {reviewOrder, updateLocation} from 'Action/user'
import * as priceActions from 'Action/price'
import * as modalActions from 'Action/modal'
import * as navigationActions from 'Action/navigation'
import * as printingEngine from 'Service/printing-engine'
import * as normalize from 'Lib/normalize'
import * as geolocation from 'Lib/geolocation'
import TYPE from '../../../../src/app/action-type'
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
    sandbox.stub(geolocation)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('reviewOrder()', () => {
    let initialState
    let nextStates
    let store
    let form

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
      form = {
        shippingAddress: {
          firstName: 'firstName',
          lastName: 'lastName',
          city: 'city',
          countryCode: 'countryCode'
        },
        emailAddress: 'some-email-address',
        phoneNumber: 'some-phone-number'
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

      navigationActions.goToCart.withArgs().returns(resolveAsyncThunk('some-go-to-cart'))

      printingEngine.updateUser.withArgs('some-user-id', {some: 'user-data'}).resolves()

      normalize.normalizeTelephoneNumber.withArgs('some-phone-number').returns(undefined)
    })

    it('dispatches expected actions', async () => {
      await store.dispatch(reviewOrder(form))
      expect(store.getActions(), 'to equal', [
        {
          type: 'some-open-fetching-price-modal'
        },
        {
          type: TYPE.USER.UPDATED,
          payload: form
        },
        {
          type: 'some-recalculate-selected-offer-action'
        },
        {
          type: 'some-go-to-cart'
        }
      ])
    })

    it('dispatches expected actions when selected offer had an estimated price', async () => {
      initialState.price.selectedOffer.priceEstimated = true

      await store.dispatch(reviewOrder(form))
      expect(store.getActions(), 'to equal', [
        {
          type: 'some-open-fetching-price-modal'
        },
        {
          type: TYPE.USER.UPDATED,
          payload: form
        },
        {
          type: 'some-recalculate-selected-offer-action'
        },
        {
          type: 'some-open-price-changed-modal'
        }
      ])
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

      await store.dispatch(reviewOrder(form))
      expect(store.getActions(), 'to equal', [
        {
          type: 'some-open-fetching-price-modal'
        },
        {
          type: TYPE.USER.UPDATED,
          payload: form
        },
        {
          type: 'some-recalculate-selected-offer-action'
        },
        {
          type: 'some-open-price-location-changed-modal'
        }
      ])
    })
  })

  describe('updateLocation()', () => {
    let address
    let store
    let initialState

    beforeEach(() => {
      address = {}
      initialState = {}
      address = 'some-address'
    })

    describe('when address is not valid', () => {
      it('dispatches expected actions', async () => {
        geolocation.isAddressValid.returns(false)

        modalActions.openAddressModal.returns({
          type: 'open-address-modal-action'
        })

        store = mockStore(initialState)
        await store.dispatch(updateLocation(address))

        expect(store.getActions(), 'to equal', [
          {
            type: 'LEGACY.USER.SHIPPING_ADDRESS_CHANGED',
            payload: {address: 'some-address'}
          },
          {
            type: 'open-address-modal-action'
          }
        ])
      })
    })

    describe('when address is valid', () => {
      beforeEach(() => {
        geolocation.isAddressValid.returns(true)
        printingEngine.createUser.resolves({
          userId: 'some-new-user-id'
        })
        priceActions.createPriceRequest.returns({
          type: 'create-price-request-action'
        })
      })

      it('dispatches expected actions, when no user exists', async () => {
        initialState = {
          user: {
            userId: undefined
          }
        }
        store = mockStore(initialState)
        await store.dispatch(updateLocation(address))

        expect(store.getActions(), 'to equal', [
          {
            type: 'LEGACY.USER.SHIPPING_ADDRESS_CHANGED',
            payload: {address: 'some-address'}
          },
          {type: 'LEGACY.USER.CREATED', payload: {userId: 'some-new-user-id'}},
          {type: 'create-price-request-action'}
        ])
      })

      it('dispatches expected actions, when user exists', async () => {
        initialState = {
          user: {
            userId: 'some-user-id'
          }
        }
        store = mockStore(initialState)
        await store.dispatch(updateLocation(address))

        expect(store.getActions(), 'to equal', [
          {
            type: 'LEGACY.USER.SHIPPING_ADDRESS_CHANGED',
            payload: {address: 'some-address'}
          },
          {type: 'LEGACY.USER.UPDATED'},
          {type: 'create-price-request-action'}
        ])
      })
    })
  })
})
