// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'

import * as stripe from 'Service/stripe'
import * as paypal from 'Service/paypal'
import * as printingEngine from 'Lib/printing-engine'

import type {State} from '../type'
import TYPE from '../action-type'

// Syncron actions

const orderStarted = createAction(
  TYPE.ORDER.STARTED
)
const payed = createAction(
  TYPE.ORDER.PAYED,
  (paymentToken : string) => ({paymentToken})
)
const aborted = createAction(
  TYPE.ORDER.ABORTED
)
const ordered = createAction(
  TYPE.ORDER.ORDERED,
  (orderId : string) => ({orderId})
)

// Async actions

const createOrder = (type : string, token : string) => async (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const {
    user: {
      userId
    },
    price: {
      priceId,
      selectedOffer
    }
  } = getState()

  if (!selectedOffer) throw new Error('No offer selected')
  const offerId = selectedOffer.offerId

  try {
    const {orderId} = await printingEngine.order({userId, priceId, offerId, type, token})
    dispatch(ordered(orderId))
  } catch (error) {
    dispatch(ordered(error))
  }
}

export const payWithStripe = () => async (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  dispatch(orderStarted())
  const offer = getState().price.selectedOffer
  if (!offer) throw new Error('No offer selected')

  const currency = offer.currency
  const amount = offer.totalPrice
  const email = getState().user.user.emailAddress

  try {
    const tokenObject = await stripe.checkout({amount, currency, email})
    const paymentToken = tokenObject.id
    dispatch(payed(paymentToken))
  } catch (error) {
    dispatch(aborted())
    throw error // Reject to inform callee about the result
  }
}

export const payWithPaypal = () => (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const {price} = getState()
  if (!price.selectedOffer) throw new Error('No offer selected')
  const {totalPrice, currency, offerId} = price.selectedOffer
  return paypal.createPayment({amount: totalPrice, currency, offerId})
}

export const createOrderWithStripe = () => (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const token = getState().order.paymentToken
  if (!token) throw new Error('Payment token missing')
  return dispatch(createOrder('stripe', token))
}

export const createOrderWithPaypal = (data : any, actions : any) => async (
  dispatch : Dispatch<*>
) => {
  const payment = await paypal.executePayment({actions})
  const token = payment.id

  dispatch(createOrder('paypal', token))
  return payment
}
