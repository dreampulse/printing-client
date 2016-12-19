import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  cartId: null,
  cartPrice: null
}

function handleCartRequestCreated (state, {payload}) {
  return {
    ...state,
    cartId: payload
  }
}

function handleReceiveFinalPrice (state, {payload}) {
  return {
    ...state,
    cartPrice: payload
  }
}

export default handleActions({
  [TYPE.CART.REQUEST_CREATED]: handleCartRequestCreated,
  [TYPE.CART.RECEIVED_FINAL_PRICE]: handleReceiveFinalPrice
}, initialState)
