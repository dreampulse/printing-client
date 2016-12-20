import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'
import stripeCheckout from '../service/stripe-checkout'
import getTotalAmount from '../util/get-total-amount'

export const createOrderWithStripe = () => async (dispatch, getState) => {
  const cart = getState().cart.cartPrice
  const cartId = getState().cart.cartId

  const {currency} = cart
  const email = 'test@test.test'
  const amount = getTotalAmount({cart})

  const tokenObject = await stripeCheckout({amount, currency, email})
  const token = tokenObject.id

  const {orderId} = await printingEngine.order({cartId, type: 'stripe', token})
  dispatch(createAction(TYPE.ORDER.SUCCESS)(orderId))
}
