import {
  payWithStripe,
  createOrder,
  initPaymentWithPaypal,
  createOrderWithPaypal
} from '../../../../src/app/action/order'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'
import * as stripe from '../../../../src/app/service/stripe'
import * as paypal from '../../../../src/app/service/paypal'

describe('Order Integration Test', () => {
  let sandbox
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(printingEngine)
    sandbox.stub(stripe)
    sandbox.stub(paypal)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('payWithStripe()', () => {
    beforeEach(() => {
      store = Store({
        user: {
          userId: 'some-user-id',
          user: {
            emailAddress: 'some-email-address'
          }
        },
        price: {
          priceId: 'some-price-id',
          selectedOffer: {
            offerId: 'some-offer-id',
            currency: 'some-currency',
            totalPrice: 23.5
          }
        },
        order: {
          paymentToken: null,
          orderInProgress: false
        }
      })

      printingEngine.order.resolves({orderId: 'some-order-id'})
    })

    it('should work', async () => {
      stripe.checkout.resolves({
        id: 'some-stripe-token'
      })

      await store.dispatch(payWithStripe())

      expect(store.getState().order, 'to equal', {
        paymentToken: 'some-stripe-token',
        orderInProgress: true
      })

      expect(stripe.checkout, 'was called with', {
        amount: 23.5,
        currency: 'some-currency',
        email: 'some-email-address'
      })
    })

    it('resets orderInProgress if user aborts', async () => {
      const error = new Error()
      stripe.checkout.rejects(error)

      try {
        await store.dispatch(payWithStripe())
        throw new Error('We should not get here!')
      } catch (e) {
        expect(e, 'to be', error)

        expect(store.getState().order, 'to equal', {
          paymentToken: null,
          orderInProgress: false
        })
      }
    })
  })

  describe('createOrder()', () => {
    beforeEach(() => {
      store = Store({
        user: {
          userId: 'some-user-id',
          user: {
            emailAddress: 'some-email-address'
          }
        },
        price: {
          priceId: 'some-price-id',
          selectedOffer: {
            offerId: 'some-offer-id',
            currency: 'some-currency',
            totalPrice: 23.5
          }
        },
        order: {
          paymentToken: 'some-stripe-token',
          orderInProgress: true
        }
      })

      printingEngine.order.resolves({orderId: 'some-order-id'})
    })

    it('should work', async () => {
      await store.dispatch(createOrder())

      expect(store.getState().order, 'to equal', {
        orderId: 'some-order-id',
        paymentToken: 'some-stripe-token',
        orderInProgress: false
      })

      expect(printingEngine.order, 'was called with', {
        userId: 'some-user-id',
        offerId: 'some-offer-id',
        priceId: 'some-price-id',
        type: 'stripe',
        token: 'some-stripe-token'
      })
    })
  })

  describe('initPaymentWithPaypal', () => {
    it.skip('should work', async () => {
      paypal.createPayment.resolves('some-payment')

      const payment = await store.dispatch(initPaymentWithPaypal())
      expect(payment, 'to equal', 'some-payment')

      expect(paypal.createPayment, 'was called with', {
        amount: 52.5,
        currency: 'some-currency',
        offerId: 'some-offer-id'
      })
    })
  })

  describe('createOrderWithPaypal', () => {
    it.skip('should work', async () => {
      const data = {foo: 'bar'}
      const actions = {bar: 'baz'}
      paypal.executePayment.withArgs({actions}).resolves({id: 'some-payment-id'})

      await store.dispatch(createOrderWithPaypal(data, actions))

      expect(store.getState().order, 'to equal', {
        userId: 'some-user-id',
        offerId: 'some-offer-id',
        priceId: 'some-price-id',
        type: 'paypal',
        token: 'some-payment-id'
      })
    })
  })
})
