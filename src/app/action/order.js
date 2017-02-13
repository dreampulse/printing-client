import {createAction} from 'redux-actions'

import TYPE from '../type'
import * as stripe from '../service/stripe'
import * as paypal from '../service/paypal'
import * as printingEngine from '../lib/printing-engine'
import {getCartAmount} from '../lib/get-total-amount'

export const orderOrdered = createAction(TYPE.ORDER.ORDERED)

// Async actions

export const createOrderWithStripe = () => async (dispatch, getState) => {
  // TODO: createShoppingCart()

  const cart = getState().cart.cart
  const cartId = getState().cart.cartId

  const {currency} = cart
  const email = 'test@test.test'
  const amount = getCartAmount(cart)

  const tokenObject = await stripe.checkout({amount, currency, email})
  const token = tokenObject.id

  return dispatch(
    orderOrdered(
      printingEngine.order({
        cartId, type: 'stripe', token
      })
    )
  )
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

  return dispatch(
    orderOrdered(
      printingEngine.order({
        cartId, type: 'paypal', token
      })
    )
  )
}
