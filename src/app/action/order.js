// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'

import * as stripe from 'Service/stripe'
import * as paypal from 'Service/paypal'
import * as printingEngine from 'Service/printing-engine'
import {AppError} from 'Lib/error'
import {selectSearchParams} from 'Lib/selector'

import type {State} from '../type'
import TYPE, {ERROR_TYPE} from '../action-type'
import {openFatalErrorModal} from './modal'

// Sync actions
const orderStarted = createAction(TYPE.ORDER.STARTED)
const payed = createAction(TYPE.ORDER.PAYED, (paymentToken: string) => ({paymentToken}))
const aborted = createAction(TYPE.ORDER.ABORTED)
const ordered = createAction(
  TYPE.ORDER.ORDERED,
  ({orderId, orderNumber}: {orderId: string, orderNumber: string}) => ({orderId, orderNumber})
)

// Async actions
const createOrder = () => async (dispatch: Dispatch<*>, getState: () => State) => {
  const {user: {userId, utmParams}, price: {priceId, selectedOffer}} = getState()

  if (!selectedOffer) throw new Error('No offer selected')
  const offerId = selectedOffer.offerId

  try {
    const {orderId, orderNumber} = await printingEngine.order({
      userId,
      priceId,
      offerIds: [offerId],
      utmParams
    })

    dispatch(ordered({orderId, orderNumber}))
    return {orderId, orderNumber}
  } catch (error) {
    dispatch(
      openFatalErrorModal(new AppError(ERROR_TYPE.ORDER_FAILED, 'Failed to process the order'))
    )

    return null
  }
}

export const payWithStripe = () => async (dispatch: Dispatch<*>, getState: () => State) => {
  dispatch(orderStarted())
  const offer = getState().price.selectedOffer
  if (!offer) throw new Error('No offer selected')

  const currency = offer.currency
  const amount = offer.totalPrice
  const email = getState().user.user.emailAddress

  await dispatch(createOrder())

  try {
    const tokenObject = await stripe.checkout({amount, currency, email})
    const paymentToken = tokenObject.id
    dispatch(payed(paymentToken))
  } catch (error) {
    dispatch(aborted())
    throw error // Reject to inform callee about the result
  }
}

export const payWithPaypal = () => async (dispatch: Dispatch<any>, getState: () => State) => {
  const {price, user} = getState()

  const order = await dispatch(createOrder())

  if (!price.selectedOffer) throw new Error('No offer selected')

  const {totalPrice, currency, vatPrice, shipping, subTotalPrice} = price.selectedOffer
  const {orderId, orderNumber} = order

  const {paymentId, providerFields} = await paypal.createPayment({
    amount: totalPrice,
    currency,
    orderId,
    subTotal: subTotalPrice,
    vat: vatPrice,
    orderNumber,
    shipping: shipping.price,
    shippingAddress: user.user.shippingAddress
  })

  dispatch(payed(paymentId))

  return providerFields.paymentId
}

export const createOrderWithStripe = () => async (dispatch: Dispatch<*>, getState: () => State) => {
  const token = getState().order.paymentToken
  const orderId = getState().order.orderId

  if (!token) throw new Error('Payment token missing')

  // execute optimistic in background without waiting
  try {
    await printingEngine.createStripePayment({token, orderId})
  } catch (err) {
    throw new Error(`Stripe payment failed: ${err.message}`)
  }
}

export const createOrderWithPaypal = (data: any) => async (
  dispatch: Dispatch<*>,
  getState: () => State
) => {
  const paymentId = getState().order.paymentToken
  const payment = await paypal.executePayment({data, paymentId})
  return payment
}

// This actions are only available by using the 'invoice'-feature flag

export const payWithInvoice = () => async (dispatch: Dispatch<any>, getState: () => State) => {
  await dispatch(createOrder())

  const query = selectSearchParams(getState())
  const invoiceKey = query.get('invoice_key')
  if (!invoiceKey) throw new Error('Invoice key missing')

  dispatch(payed(invoiceKey))
}

export const createOrderWithInvoice = () => (dispatch: Dispatch<*>, getState: () => State) => {
  const token = getState().order.paymentToken
  const orderId = getState().order.orderId
  if (!token) throw new Error('Payment token missing')

  return printingEngine.createInvoicePayment({token, orderId})
}
