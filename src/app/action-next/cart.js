// @flow

import type {Action, Quote, Shipping} from '../type-next'

type AddToCartAction = Action<'CART.ADD_TO_CART', {quotes: Array<Quote>}>

export type CartAction = AddToCartAction

export const addToCart = (quotes: Array<Quote>, shipping: Shipping): AddToCartAction => ({
  type: 'CART.ADD_TO_CART',
  payload: {
    quotes,
    shipping
  }
})
