import {createAction} from 'redux-actions'

import * as stripe from 'Service/stripe'
// import * as paypal from '../service/paypal'
import * as printingEngine from 'Lib/printing-engine'

import {createShoppingCart} from './cart'

import TYPE from '../type'

export const createOrderWithStripe = () => async (dispatch, getState) => {
  await dispatch(createShoppingCart())

  const offer = getState().cart.selectedOffer
  const cartId = getState().cart.cartId
  const currency = offer.currency
  const amount = offer.totalPrice
  const email = getState().user.user.emailAddress

  const tokenObject = await stripe.checkout({amount, currency, email})
  const token = tokenObject.id

  const orderPromise = printingEngine.order({cartId, type: 'stripe', token})
  return dispatch(createAction(TYPE.ORDER.ORDERED)(orderPromise))
}

// TODO: implement Paypal
/*
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
*/
