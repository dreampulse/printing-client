import { createOrderWithStripe, initPaymentWithPaypal, createOrderWithPaypal } from '../../../../src/app/action/order'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as stripe from '../../../../src/app/service/stripe'
import * as paypal from '../../../../src/app/service/paypal'

describe('Shopping Cart Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    sinon.stub(stripe)
    sinon.stub(paypal)

    store = Store({
      cart: {
        cart: {
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

    printingEngine.order.resolves({orderId: 'some-order-id'})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
    sinon.restore(stripe)
    sinon.restore(paypal)
  })

  describe('createOrderWithStripe()', () => {
    it('should work', async () => {
      stripe.checkout.resolves({
        id: 'some-stripe-token'
      })

      await store.dispatch(createOrderWithStripe())

      expect(store.getState().order, 'to equal', {
        orderId: 'some-order-id'
      })

      expect(stripe.checkout, 'was called with', {
        amount: 52.5,
        currency: 'some-currency',
        email: 'test@test.test'
      })
    })
  })

  describe('initPaymentWithPaypal', () => {
    it('should work', async () => {
      paypal.createPayment.resolves('some-payment')

      const payment = await store.dispatch(initPaymentWithPaypal())
      expect(payment, 'to equal', 'some-payment')

      expect(paypal.createPayment, 'was called with', {
        amount: 52.5,
        currency: 'some-currency',
        cartId: 'some-cart-id'
      })
    })
  })

  describe('createOrderWithPaypal', () => {
    it('should work', async () => {
      const data = {foo: 'bar'}
      const actions = {bar: 'baz'}
      paypal.executePayment.withArgs({actions}).resolves({ id: 'some-payment-id' })

      await store.dispatch(createOrderWithPaypal(data, actions))

      expect(store.getState().order, 'to equal', {
        orderId: 'some-order-id'
      })
    })
  })
})
