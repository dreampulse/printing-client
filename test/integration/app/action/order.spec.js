import { createOrderWithStripe } from '../../../../src/app/action/order'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as stripe from '../../../../src/app/service/stripe'

describe('Shopping Cart Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(stripe)
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(stripe)
  })

  describe('createOrderWithStripe()', () => {
    it('should work', async () => {
      stripe.checkout.resolves({
        id: 'some-stripe-token'
      })

      printingEngine.order.resolves({orderId: 'some-order-id'})

      store = Store({
        cart: {
          cartPrice: {
            currency: 'some-currency',
            items: [{
              price: 10,
              quantity: 1
            }, {
              price: 20,
              quantity: 1
            }],
            shipping: [{
              price: 5
            }],
            vatPercentage: 0.5
          },
          cartId: 'some-cart-id'
        }
      })

      await store.dispatch(createOrderWithStripe())

      expect(store.getState().order, 'to equal', {
        orderId: 'some-order-id'
      })

      expect(stripe.checkout, 'was called with', {
        amount: 17.5,
        currency: 'some-currency',
        email: 'test@test.test'
      })
    })
  })
})
