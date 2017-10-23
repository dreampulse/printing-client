// @flow

import cloneDeep from 'lodash/cloneDeep'

import type {PriceState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  priceId: null,
  offers: null,
  printingServiceComplete: null,
  selectedOffer: null,
  error: null
}

function handleClearOffers(state) {
  return {
    ...state,
    offers: null,
    printingServiceComplete: null,
    error: null
  }
}

function handleSelectOffer(state, {payload: {offer}}) {
  return {
    ...state,
    selectedOffer: cloneDeep(offer)
  }
}

function handlePriceRequested(state, {payload: {priceId}}) {
  return {
    ...state,
    priceId
  }
}

function handleGotError(state, {payload}) {
  return {
    ...initialState,
    error: payload
  }
}

function handlePriceReceived(state, {payload}) {
  const {offers, printingServiceComplete} = payload.price

  return {
    ...state,
    offers,
    printingServiceComplete,
    error: null
  }
}

function handlePriceTimeout(state) {
  const {offers, printingServiceComplete} = state

  // Remove estimated offers
  const finalOffers = offers ? offers.filter(offer => !offer.priceEstimated) : null

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

const reducer = (state: PriceState = initialState, action: Action): PriceState => {
  switch (action.type) {
    case TYPE.PRICE.CLEAR_OFFERS:
      return handleClearOffers(state)
    case TYPE.PRICE.SELECT_OFFER:
      return handleSelectOffer(state, action)
    case TYPE.PRICE.REQUESTED:
      return handlePriceRequested(state, action)
    case TYPE.PRICE.RECEIVED:
      return handlePriceReceived(state, action)
    case TYPE.PRICE.TIMEOUT:
      return handlePriceTimeout(state)
    case TYPE.PRICE.GOT_ERROR:
      return handleGotError(state, action)
    default:
      return state
  }
}

export default reducer
