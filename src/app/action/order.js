import {createAction} from 'redux-actions'

import * as stripe from 'Service/stripe'
// import * as paypal from '../service/paypal'
import * as printingEngine from 'Lib/printing-engine'

import TYPE from '../type'

export const payWithStripe = () => async (dispatch, getState) => {
  dispatch(createAction(TYPE.ORDER.STARTED)())
  const offer = getState().cart.selectedOffer
  const currency = offer.currency
  const amount = offer.totalPrice
  const email = getState().user.user.emailAddress

  try {
    const tokenObject = await stripe.checkout({amount, currency, email})
    const paymentToken = tokenObject.id
    dispatch(createAction(TYPE.ORDER.PAYED)({paymentToken}))
  } catch (error) {
    dispatch(createAction(TYPE.ORDER.ABORTED)())
    throw error // Reject to inform callee about the result
  }
}

export const createOrder = () => (dispatch, getState) => {
  const userId = getState().user.userId
  const priceId = getState().price.priceId
  const offerId = getState().cart.selectedOffer.offerId
  const token = getState().order.paymentToken
  const orderPromise = printingEngine.order({userId, priceId, offerId, type: 'stripe', token})

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
