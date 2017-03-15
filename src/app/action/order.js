import {createAction} from 'redux-actions'

import TYPE from '../type'
import * as stripe from '../service/stripe'
import * as paypal from '../service/paypal'
import * as printingEngine from '../lib/printing-engine'
import {getCartAmount} from '../lib/price'

export const createOrderWithStripe = () => async (dispatch, getState) => {
  const cart = getState().cart.cart
  const cartId = getState().cart.cartId

  const {currency} = cart
  const email = getState().user.user.emailAddress
   // TODO: The cart should provide the total amount
  const amount = getCartAmount(cart)

  const tokenObject = await stripe.checkout({amount, currency, email})
  const token = tokenObject.id

  const orderPromise = printingEngine.order({cartId, type: 'stripe', token})
  return dispatch(createAction(TYPE.ORDER.ORDERED)(orderPromise))
}

export const initPaymentWithPaypal = () => (dispatch, getState) => {
  const cart = getState().cart.cart
  const cartId = getState().cart.cartId

  const {currency} = cart
  const amount = getCartAmount(cart)

  return paypal.createPayment({amount, currency, cartId})
}

export const createOrderWithPaypal = (data, actions) => async (dispatch, getState) => {
  const payment = await paypal.executePayment({actions})

  const cartId = getState().cart.cartId
  const token = payment.id

  const orderPromise = printingEngine.order({cartId, type: 'paypal', token})
  return dispatch(createAction(TYPE.ORDER.ORDERED)(orderPromise))
}
