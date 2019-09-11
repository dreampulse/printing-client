import uuidv1 from 'uuid/v1'
import {Action, Quote, Shipping, Cart, ConfigId, CartOffer, CartOfferId} from '../type'

export type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: ConfigId[]; quotes: Quote[]; shipping: Shipping}
>
export type CreateCartAction = Action<'CART.CREATE_CART', void>
export type CartReceivedAction = Action<'CART.CART_RECEIVED', {cart: Cart}>
export type LoadOfferAction = Action<'CART.LOAD_OFFER', {id: CartOfferId; currency: string}>
export type OfferReceivedAction = Action<
  'CART.OFFER_RECEIVED',
  CartOffer & {modelConfigIds: ConfigId[]}
>
export type LoadOfferConfigurationAction = Action<
  'CART.LOAD_OFFER_CONFIGURATION',
  {id: CartOfferId}
>

export type CartAction =
  | AddToCartAction
  | CreateCartAction
  | CartReceivedAction
  | LoadOfferAction
  | OfferReceivedAction
  | LoadOfferConfigurationAction

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

export const loadOffer = (id: CartOfferId, currency: string): LoadOfferAction => ({
  type: 'CART.LOAD_OFFER',
  payload: {id, currency}
})

export const offerReceived = (offer: CartOffer): OfferReceivedAction => ({
  type: 'CART.OFFER_RECEIVED',
  payload: {...offer, modelConfigIds: offer.models.map(_ => uuidv1())}
})

export const loadOfferConfiguration = (id: CartOfferId): LoadOfferConfigurationAction => ({
  type: 'CART.LOAD_OFFER_CONFIGURATION',
  payload: {id}
})
