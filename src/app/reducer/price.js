import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  priceId: null,
  offers: null,
  printingServiceComplete: null
}

function handlePriceRequested (state, {payload: {priceId}, error}) {
  return {
    ...state,
    priceId,
    error: !!error
  }
}

function handlePriceReceived (state, {payload: {offers, printingServiceComplete}, error}) {
  return {
    ...state,
    offers,
    printingServiceComplete,
    error: !!error
  }
}

export default handleActions({
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived
}, initialState)
