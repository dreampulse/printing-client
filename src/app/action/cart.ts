import {Action, Quote, Shipping, Cart, ConfigId} from '../type'

export type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: ConfigId[]; quotes: Quote[]; shipping: Shipping}
>
export type CreateCartAction = Action<'CART.CREATE_CART', void>
export type CartReceivedAction = Action<'CART.CART_RECEIVED', {cart: Cart}>

export type CartAction = AddToCartAction | CreateCartAction | CartReceivedAction

export const addToCart = (
  configIds: ConfigId[],
  quotes: Quote[],
  shipping: Shipping
): AddToCartAction => ({
  type: 'CART.ADD_TO_CART',
  payload: {
    configIds,
    quotes,
    shipping
  }
})

export const createCart = (): CreateCartAction => ({
  type: 'CART.CREATE_CART',
  payload: undefined
})

export const cartReceived = (cart: Cart): CartReceivedAction => ({
  type: 'CART.CART_RECEIVED',
  payload: {
    cart
  }
})
