import * as cart from '../../../../src/app/action/cart'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Shopping Cart Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('selectOffer()', () => {
    it('should work', () => {
      store = Store({})

      store.dispatch(cart.selectOffer({offer: {
        some: 'offer'
      }}))

      expect(store.getState().cart.selectedOffer, 'to equal', {some: 'offer'})
    })
  })

  describe('createShoppingCart()', () => {
    it('should work', async () => {
      store = Store({
        user: {
          userId: 'some-user-id'
        },
        price: {
          priceId: 'some-price-id'
        },
        cart: {
          selectedOffer: {
            offerId: 'some-offer-id'
          }
        }
      })

      printingEngine.createShoppingCart.resolves({cartId: 'some-cart-id'})

      await store.dispatch(cart.createShoppingCart())

      expect(store.getState().cart, 'to satisfy', {
        cartId: 'some-cart-id'
      })

      expect(printingEngine.createShoppingCart, 'was called with', {
        userId: 'some-user-id',
        priceId: 'some-price-id',
        offerId: 'some-offer-id'
      })
    })
  })
})
