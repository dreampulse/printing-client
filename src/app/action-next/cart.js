// @flow

import type {Action, Quote, Shipping, ConfigId} from '../type-next'

type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: Array<ConfigId>, quotes: Array<Quote>, shipping: Shipping}
>

export type CartAction = AddToCartAction

export const addToCart = (
  configIds: Array<ConfigId>,
  quotes: Array<Quote>,
  shipping: Shipping
): AddToCartAction => ({
  type: 'CART.ADD_TO_CART',
  payload: {
    configIds,
    quotes,
    shipping
  }
})
