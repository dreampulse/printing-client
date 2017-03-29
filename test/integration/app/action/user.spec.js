import {detectAddress, createUser, updateUser, reviewOrder} from 'Action/user'
import * as navigation from 'Action/navigation'
import * as modal from 'Action/modal'
import * as price from 'Action/price'
import * as printingEngine from 'Lib/printing-engine'
import * as geolocation from 'Lib/geolocation'

import Store from '../../../../src/app/store'
import TYPE from '../../../../src/app/type'

describe('User Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(geolocation)
    sinon.stub(navigation)
    sinon.stub(modal)
    sinon.stub(price)
    store = Store()
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(geolocation)
    sinon.restore(navigation)
    sinon.restore(modal)
    sinon.restore(price)
  })

  describe('detectAddress()', () => {
    it('should work', async () => {
      const location = {
        city: 'Pittsburgh',
        zipCode: '15234',
        stateCode: 'PA',
        countryCode: 'US'
      }
      geolocation.getLocationByIp.resolves(location)

      await store.dispatch(detectAddress())

      expect(store.getState().user.user.shippingAddress, 'to equal', location)
    })
  })

  describe('createUser()', () => {
    it('should work', async () => {
      const userId = '789'
      printingEngine.createUser.resolves({userId})

      await store.dispatch(createUser())
      expect(store.getState().user, 'to satisfy', {
        userId
      })
    })
  })

  describe('updateUser()', () => {
    it('should work', async () => {
      const userId = '789'
      const user = {someUserInfo: 'something'}

      store = Store({
        user: {
          userId
        }
      })

      printingEngine.updateUser.resolves(user)

      await store.dispatch(updateUser(user))

      expect(store.getState().user, 'to satisfy', {
        userId,
        user
      })
      expect(printingEngine.updateUser, 'was called with', {
        userId,
        user
      })
    })
  })

  describe('reviewOrder()', () => {
    let state

    beforeEach(() => {
      state = {
        user: {
          user: {
            shippingAddress: 'some-address'
          }
        },
        cart: {
          selectedOffer: {
            totoalPrice: 23.42
          }
        }
      }
    })

    it('works when shipping address stays the same', async () => {
      store = Store(state)

      const form = {
        shippingAddress: 'some-address'
      }

      printingEngine.updateUser.resolves()
      navigation.goToCart.returns({type: 'some-action'})

      await store.dispatch(reviewOrder(form))

      expect(navigation.goToCart, 'was called once')
      expect(store.getState().user.user, 'to equal', state.user.user)
    })

    it('works whe shipping address differs and price stays the same', async () => {
      store = Store(state)

      const form = {
        shippingAddress: 'some-other-address'
      }

      printingEngine.updateUser.resolves()
      navigation.goToCart.returns({type: 'some-action'})
      modal.openFetchingPriceModal.returns({type: 'some-action'})
      price.createPriceRequest.resolves({type: 'some-action'})

      await store.dispatch(reviewOrder(form))

      expect(navigation.goToCart, 'was called once')
      expect(price.createPriceRequest, 'was called once')
      expect(store.getState().user.user.shippingAddress, 'to equal', 'some-other-address')
    })

    it('works whe shipping address differs and price differs', async () => {
      store = Store(state)

      const form = {
        shippingAddress: 'some-other-address'
      }

      printingEngine.updateUser.resolves()
      navigation.goToCart.returns({type: 'some-action'})
      modal.openFetchingPriceModal.returns({type: 'some-action'})
      modal.openPriceChangedModal.returns({type: 'some-action'})
      price.createPriceRequest.resolves({  // updates selected offer
        type: TYPE.CART.OFFER_SELECTED,
        payload: {offer: {
          totalPrice: 11.5
        }}
      })

      await store.dispatch(reviewOrder(form))

      expect(navigation.goToCart, 'was not called')
      expect(price.createPriceRequest, 'was called once')
      expect(store.getState().user.user.shippingAddress, 'to equal', 'some-other-address')
      expect(modal.openPriceChangedModal, 'was called with', {
        oldShippingAddress: 'some-address',
        newShippingAddress: 'some-other-address'
      })
    })
  })
})
