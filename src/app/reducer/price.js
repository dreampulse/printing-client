import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  priceId: null,
  price: null
}

function handlePriceRequestCreated (state, {payload}) {
  return {
    ...state,
    priceId: payload
  }
}

function handlePriceReceived (state, {payload}) {
  return {
    ...state,
    price: payload
  }
}

export default handleActions({
  [TYPE.PRICE.REQUEST_CREATED]: handlePriceRequestCreated,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived
}, initialState)
