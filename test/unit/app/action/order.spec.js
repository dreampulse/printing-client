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
          emailAddress: 'some-email-address'
        }
      },
      order: {
        paymentToken: 'some-token'
      }
    }
    store = mockStore(initialStoreData)

    sandbox = sinon.sandbox.create()
    sandbox.stub(stripe, 'checkout')
    sandbox.stub(paypal, 'createPayment')
    sandbox.stub(paypal, 'executePayment')
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

    describe('payWithPaypal()', () => {
      it('fulfills with correct arguments', () => {
        paypal.createPayment
          .withArgs({amount: 42, currency: 'some-currency', offerId: 'some-offer-id'})
          .resolves('create-paypal-payment')

        expect(store.dispatch(payWithPaypal()), 'to be fulfilled with', 'create-paypal-payment')
      })
    })

    describe('createOrderWithStripe()', () => {
      it('dispatches expected actions, when everything succeeds', async () => {
        printingEngine.order
          .withArgs({
            userId: 'some-user-id',
            priceId: 'some-price-id',
            offerId: 'some-offer-id',
            type: 'stripe',
            token: 'some-token'
          })
          .resolves({
            orderId: 'some-order-id'
          })

        await store.dispatch(createOrderWithStripe())
        expect(store.getActions(), 'to equal', [
          {type: 'ORDER.ORDERED', payload: {orderId: 'some-order-id'}}
        ])
      })

      it('dispatches expected actions, when order rejects', async () => {
        printingEngine.order.rejects(new Error('some-error'))

        await store.dispatch(createOrderWithStripe())
        expect(store.getActions(), 'to equal', [
          {type: 'ORDER.GOT_ERROR', payload: new Error('some-error'), error: true}
        ])
      })
    })

    describe('createOrderWithPaypal()', () => {
      it('dispatches expected actions, when everything succeeds', async () => {
        printingEngine.order
          .withArgs({
            userId: 'some-user-id',
            priceId: 'some-price-id',
            offerId: 'some-offer-id',
            type: 'paypal',
            token: 'some-token'
          })
          .resolves({
            orderId: 'some-order-id'
          })

        paypal.executePayment.withArgs({actions: 'some-action'}).resolves({
          id: 'some-token'
        })

        await store.dispatch(createOrderWithPaypal('some-data', 'some-action'))
        expect(store.getActions(), 'to equal', [
          {type: 'ORDER.ORDERED', payload: {orderId: 'some-order-id'}}
        ])
      })

      it('dispatches expected actions, when order rejects', async () => {
        printingEngine.order.rejects(new Error('some-error'))

        paypal.executePayment.resolves({
          id: 'some-token'
        })

        await store.dispatch(createOrderWithPaypal())
        expect(store.getActions(), 'to equal', [
          {type: 'ORDER.GOT_ERROR', payload: new Error('some-error'), error: true}
        ])
      })
    })
  })
})
