// @flow

import type {OrderState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  orderId: null,
  paymentId: null,
  orderNumber: null,
  paymentToken: null,
  orderInProgress: false
}

function handleOrderOrdered(state, {payload: {orderId, orderNumber}}) {
  return {
    ...state,
    orderId,
    orderNumber,
    orderInProgress: false
  }
}

function handleOrderPayed(state, {payload: {paymentToken}}) {
  return {
    ...state,
    paymentToken
  }
}

function handleOrderStarted(state) {
  return {
    ...state,
    orderInProgress: true
  }
}

function handleOrderAborted(state) {
  return {
    ...state,
    orderInProgress: false
  }
}

function handlePaymentCreated(state, {payload: {paymentId}}) {
  return {
    ...state,
    paymentId
  }
}

const reducer = (state: OrderState = initialState, action: Action): OrderState => {
  switch (action.type) {
    case TYPE.ORDER.ORDERED:
      return handleOrderOrdered(state, action)
    case TYPE.ORDER.PAYED:
      return handleOrderPayed(state, action)
    case TYPE.ORDER.STARTED:
      return handleOrderStarted(state)
    case TYPE.ORDER.ABORTED:
      return handleOrderAborted(state)
    case TYPE.ORDER.PAYMENT_CREATED:
      return handlePaymentCreated(state, action)
    default:
      return state
  }
}

export default reducer
