// @flow

import type {OrderState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  orderId: null,
  orderNumber: null,
  paymentToken: null,
  orderInProgress: false
}

function handleOrderOrdered(state, {payload: {orderId, orderNumber}, error}) {
  if (error) {
    // @TODO: is this still possible (we removed redux promise)
    return {
      ...state,
      orderId: null,
      orderNumber: null,
      orderInProgress: false
    }
  }

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
    default:
      return state
  }
}

export default reducer
