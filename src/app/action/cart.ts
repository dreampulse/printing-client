import uuidv1 from 'uuid/v1'
import {Action, Quote, Shipping, Cart, ConfigId, CartId, OfferId} from '../type'
import {OfferResponse} from '../lib/printing-engine'

export type AddToCartAction = Action<
  'CART.ADD_TO_CART',
  {configIds: ConfigId[]; quotes: Quote[]; shipping: Shipping}
>
export type CreateCartAction = Action<'CART.CREATE_CART', void>
export type CartReceivedAction = Action<'CART.CART_RECEIVED', {cart: Cart}>
export type LoadOfferAction = Action<'CART.LOAD_OFFER', {id: OfferId; currency: string}>
export type OfferReceivedAction = Action<
  'CART.OFFER_RECEIVED',
  OfferResponse & {modelConfigIds: ConfigId[]}
>

export type CartAction =
  | AddToCartAction
  | CreateCartAction
  | CartReceivedAction
  | LoadOfferAction
  | OfferReceivedAction

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

export const loadOffer = (id: OfferId, currency: string): LoadOfferAction => ({
  type: 'CART.LOAD_OFFER',
  payload: {id, currency}
})

export const offerReceived = (offer: OfferResponse): OfferReceivedAction => ({
  type: 'CART.OFFER_RECEIVED',
  payload: {...offer, modelConfigIds: offer.models.map(_ => uuidv1())}
})
