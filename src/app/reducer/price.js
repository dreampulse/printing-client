import {handleActions} from 'redux-actions'
import cloneDeep from 'lodash/cloneDeep'

import TYPE from '../action-type'

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
    selectedOffer: cloneDeep(offer)
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

function handlePriceTimeout (state) {
  const {offers, printingServiceComplete} = state

  // Remove estimated offers
  const finalOffers = offers
    ? offers.filter(offer => !offer.priceEstimated)
    : null

  const finalPrintingServiceComplete = printingServiceComplete
    ? Object.keys(printingServiceComplete).reduce((aggr, provider) => {
      aggr[provider] = true
      return aggr
    }, {})
    : null

  return {
    ...state,
    offers: finalOffers,
    printingServiceComplete: finalPrintingServiceComplete,
    error: null
  }
}

export default handleActions({
  [TYPE.PRICE.CLEAR_OFFERS]: handleClearOffers,
  [TYPE.PRICE.SELECT_OFFER]: handleSelectOffer,
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived,
  [TYPE.PRICE.TIMEOUT]: handlePriceTimeout
}, initialState)
