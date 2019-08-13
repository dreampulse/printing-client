import {Action, Quote, Shipping, Cart, ConfigId, CartId} from '../type'
import {OfferResponse} from '../lib/printing-engine'

export type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: ConfigId[]; quotes: Quote[]; shipping: Shipping}
>
export type CreateCartAction = Action<'CART.CREATE_CART', void>
export type CartReceivedAction = Action<'CART.CART_RECEIVED', {cart: Cart}>
export type LoadSharedCartAction = Action<'CART.LOAD_SHARED', {id: CartId; currency: string}>
export type SharedCartReceivedAction = Action<'CART.SHARD_RECEIVED', OfferResponse>

export type CartAction =
  | AddToCartAction
  | CreateCartAction
  | CartReceivedAction
  | LoadSharedCartAction
  | SharedCartReceivedAction

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

export const loadSharedCart = (id: CartId, currency: string): LoadSharedCartAction => ({
  type: 'CART.LOAD_SHARED',
  payload: {id, currency}
})

export const sharedCartReceived = (offer: OfferResponse): SharedCartReceivedAction => ({
  type: 'CART.SHARD_RECEIVED',
  payload: offer
  // TODO: maybe we need to map here to crate some uuids
})

// export const configurationReceived = (
//   payload: BackendConfiguration
// ): ConfigurationReceivedAction => ({
//   type: 'CONFIGURATION.CONFIGURATION_RECEIVED',
//   payload: {
//     items: payload.items.map(item => ({
//       ...item,
//       id: uuidv1()
//     }))
//   }
// })
