import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  selectedOffer: null,
  cartId: null,
  cart: null
}

function handleOfferSelected (state, {payload: {offer}}) {
  return {
    ...state,
    selectedOffer: offer
  }
}

function handleCartCreated (state, {payload: {cartId}}) {
  return {
    ...state,
    cartId
  }
}

function handleReceiveFinalPrice (state, {payload}) {
  return {
    ...state,
    cart: payload
  }
}

export default handleActions({
  [TYPE.CART.OFFER_SELECTED]: handleOfferSelected,
  [TYPE.CART.CREATED]: handleCartCreated,
  [TYPE.CART.RECEIVED_FINAL_PRICE]: handleReceiveFinalPrice
}, initialState)
