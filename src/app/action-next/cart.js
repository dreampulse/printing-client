// @flow

import type {Action, Quote, Shipping, ModelConfigUploaded, Cart, ConfigId} from '../type-next'

type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: Array<ConfigId>, quotes: Array<Quote>, shipping: Shipping}
>
type CreateCartAction = Action<
  'CART.CREATE_CART',
  {modelConfigs: Array<ModelConfigUploaded>, currency: string}
>
type CartReceivedAction = Action<'CART.CART_RECEIVED', {cart: Cart}>

export type CartAction = AddToCartAction | CreateCartAction | CartReceivedAction

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

export const createCart = (
  modelConfigs: Array<ModelConfigUploaded>,
  currency: string
): CreateCartAction => ({
  type: 'CART.CREATE_CART',
  payload: {
    modelConfigs,
    currency
  }
})

export const cartReceived = (cart: Cart): CartReceivedAction => ({
  type: 'CART.CART_RECEIVED',
  payload: {
    cart
  }
})
