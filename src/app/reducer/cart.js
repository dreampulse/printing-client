import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  selectedVendor: null,
  selectedShipping: null,
  quantity: 1,
  cartId: null,
  cart: null
}

function handleVendorSelected (state, {payload}) {
  return {
    ...state,
    selectedVendor: payload
  }
}

function handleShippingSelected (state, {payload}) {
  return {
    ...state,
    selectedShipping: payload
  }
}

function handleQuantityChanged (state, {payload}) {
  return {
    ...state,
    quantity: payload
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
  [TYPE.CART.VENDOR_SELECTED]: handleVendorSelected,
  [TYPE.CART.SHIPPING_SELECTED]: handleShippingSelected,
  [TYPE.CART.QUANTITY_CHANGED]: handleQuantityChanged,
  [TYPE.CART.CREATED]: handleCartCreated,
  [TYPE.CART.RECEIVED_FINAL_PRICE]: handleReceiveFinalPrice
}, initialState)
