import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as stripe from '../service/stripe'
import * as paypal from '../service/paypal'
import * as printingEngine from '../lib/printing-engine'
import getTotalAmount from '../util/get-total-amount'

export const createOrderWithStripe = () => async (dispatch, getState) => {
  const cart = getState().cart.cartPrice
  const cartId = getState().cart.cartId

  const {currency} = cart
  const email = 'test@test.test'
  const amount = getTotalAmount({cart})

  const tokenObject = await stripe.checkout({amount, currency, email})
  const token = tokenObject.id

  const {orderId} = await printingEngine.order({cartId, type: 'stripe', token})
  dispatch(createAction(TYPE.ORDER.SUCCESS)(orderId))
}

export const initPaymentWithPaypal = () => (dispatch, getState) => {
  const cart = getState().cart.cartPrice
  const cartId = getState().cart.cartId

  const {currency} = cart
  const amount = getTotalAmount({cart})

  return paypal.createPayment({ amount, currency, cartId })
}

export const createOrderWithPaypal = (payment) => async (dispatch, getState) => {
  if (payment.state !== 'approved') throw new Error('PayPal payment not approved')

  const cartId = getState().cart.cartId
  const token = payment.id

  const {orderId} = await printingEngine.order({cartId, type: 'paypal', token})
  dispatch(createAction(TYPE.ORDER.SUCCESS)(orderId))
}
