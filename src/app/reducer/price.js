import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  priceId: null,
  offers: null,
  printingServiceComplete: null,
  selectedOffer: null,
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

function handleSelectOffer (state, {payload: {offer}}) {
  return {
    ...state,
    selectedOffer: offer
  }
}

function handlePriceRequested (state, {payload: {priceId}}) {
  return {
    ...state,
    priceId
  }
}

function handlePriceReceived (state, {payload, error}) {
  if (error) {
    return {
      ...initialState,
      error: payload
    }
  }

  const {
    offers,
    printingServiceComplete
  } = payload.price

  return {
    ...state,
    offers,
    printingServiceComplete,
    error: null
  }
}

export default handleActions({
  [TYPE.PRICE.CLEAR_OFFERS]: handleClearOffers,
  [TYPE.PRICE.SELECT_OFFER]: handleSelectOffer,
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived
}, initialState)
