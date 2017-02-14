import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  priceId: null,
  price: null
}

function handlePriceRequested (state, {payload: {priceId}, error}) {
  return {
    ...state,
    priceId,
    error: !!error
  }
}

function handlePriceReceived (state, {payload, error}) {
  return {
    ...state,
    price: payload,
    error: !!error
  }
}

export default handleActions({
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived
}, initialState)
