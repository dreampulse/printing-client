import {createAction} from 'redux-actions'

import * as stripe from 'Service/stripe'
import * as paypal from 'Service/paypal'
import * as printingEngine from 'Lib/printing-engine'

import TYPE from '../type'

export const payWithStripe = () => async (dispatch, getState) => {
  dispatch(createAction(TYPE.ORDER.STARTED)())
  const offer = getState().price.selectedOffer
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
  const offerId = getState().price.selectedOffer.offerId
  const token = getState().order.paymentToken
  // TODO: error handling
  const orderPromise = printingEngine.order({userId, priceId, offerId, type: 'stripe', token})

  return dispatch(createAction(TYPE.ORDER.ORDERED)(orderPromise))
}

export const initPaymentWithPaypal = () => (dispatch, getState) => {
  const amount = getState().price.selectedOffer.totalPrice
  const currency = getState().price.selectedOffer.currency
  const offerId = getState().price.selectedOffer.offerId

  return paypal.createPayment({amount, currency, offerId})
}

export const createOrderWithPaypal = (data, actions) => async (dispatch, getState) => {
  const payment = await paypal.executePayment({actions})
  const token = payment.id

  const userId = getState().user.userId
  const priceId = getState().price.priceId
  const offerId = getState().price.selectedOffer.offerId
  const orderPromise = printingEngine.order({userId, priceId, offerId, type: 'paypal', token})

  return dispatch(createAction(TYPE.ORDER.ORDERED)(orderPromise))
}
