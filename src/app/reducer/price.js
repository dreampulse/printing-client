import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  priceId: null,
  offers: null,
  printingServiceComplete: null,
  error: null
}

function handleClearOffers (state) {
  return {
    ...state,
    offers: null,
    printingServiceComplete: null,
    error: null
  }
}

function handlePriceRequested (state, {payload: {priceId}, error}) {
  return {
    ...state,
    priceId,
    error: !!error
  }
}

function handlePriceReceived (state, {payload: {price: {offers, printingServiceComplete, error}}}) {
  if (error) {
    return {
      ...state,
      error
    }
  }

  return {
    ...state,
    offers,
    printingServiceComplete,
    error: null
  }
}

export default handleActions({
  [TYPE.PRICE.CLEAR_OFFERS]: handleClearOffers,
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived
}, initialState)
