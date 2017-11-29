import {
  payWithStripe,
  payWithPaypal,
  createOrderWithStripe,
  createOrderWithPaypal
} from 'Action/order'

import * as stripe from 'Service/stripe'
import * as paypal from 'Service/paypal'
import * as printingEngine from 'Lib/printing-engine'

describe('Order actions', () => {
  let initialStoreData
  let store
  let sandbox

  beforeEach(() => {
    initialStoreData = {
      price: {
        priceId: 'some-price-id',
        selectedOffer: {
          currency: 'some-currency',
          totalPrice: 42,
          offerId: 'some-offer-id'
        }
      },
      user: {
        userId: 'some-user-id',
        user: {
          emailAddress: 'some-email-address',
          shippingAddress: 'some-shipping-address'
        }
      },
      order: {
        paymentToken: 'some-token',
        paymentId: 'some-payment-id'
      }
    }
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.stub(stripe, 'checkout')
    sandbox.stub(paypal, 'createPayment')
    sandbox.stub(paypal, 'executePayment')
    sandbox.stub(stripe, 'executePayment')
    sandbox.stub(printingEngine, 'order')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('payWithStripe()', () => {
    it('dispatches expected actions, when everything succeeds', async () => {
      stripe.checkout
        .withArgs({amount: 42, currency: 'some-currency', email: 'some-email-address'})
        .resolves({
          id: 'some-token'
        })

      await store.dispatch(payWithStripe())
      expect(store.getActions(), 'to equal', [
        {type: 'ORDER.STARTED'},
        {type: 'ORDER.PAYED', payload: {paymentToken: 'some-token'}}
      ])
    })

    describe('when checkout rejects', () => {
      beforeEach(() => stripe.checkout.rejects(new Error('some-error')))

      it('dispatches expected actions', async () => {
        try {
          await store.dispatch(payWithStripe())
        } catch (e) {
          // ignore
        }

        expect(store.getActions(), 'to equal', [{type: 'ORDER.STARTED'}, {type: 'ORDER.ABORTED'}])
      })

      it('rejects with the correct error', () =>
        expect(store.dispatch(payWithStripe()), 'to be rejected with', 'some-error'))
    })

    describe('createOrderWithStripe()', () => {
      it('dispatches expected actions, when everything succeeds', async () => {
        printingEngine.order.resolves({
          orderId: 'some-order-id',
          orderNumber: 123
        })

        stripe.executePayment.resolves()

        await store.dispatch(createOrderWithStripe())
        expect(store.getActions(), 'to equal', [
          {type: 'ORDER.ORDERED', payload: {orderId: 'some-order-id', orderNumber: 123}}
        ])
      })

      it('dispatches expected actions, when order rejects', async () => {
        printingEngine.order.rejects(new Error('some-error'))

        return expect(
          store.dispatch(createOrderWithStripe()),
          'to be rejected with',
          'No order found. Has to be created before payment.'
        )
      })
    })
  })

  describe('payWithPaypal()', () => {
    it('fulfills with correct arguments', () => {
      paypal.createPayment
        .withArgs({
          amount: 42,
          currency: 'some-currency',
          offerId: 'some-offer-id',
          shippingAddress: 'some-shipping-address'
        })
        .resolves({paymentId: 'payment-id', providerFields: {}})

      return expect(
        store.dispatch(payWithPaypal()),
        'to be rejected with',
        'No order found. Has to be created before payment.'
      )
    })
  })

  describe('createOrderWithPaypal()', () => {
    it('should resolve with the payment in case executePayment resolves', () => {
      paypal.executePayment.resolves({paymentId: 'payment-id', providerFields: {}})

      return expect(store.dispatch(createOrderWithPaypal()), 'to be fulfilled with', {
        paymentId: 'payment-id',
        providerFields: {}
      })
    })
  })
})
