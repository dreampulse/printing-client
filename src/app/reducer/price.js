import {handleActions} from 'redux-actions'

import TYPE from '../type'
import config from '../../../config'

const initialCountdown = config.pollingRetries

const initialState = {
  priceId: null,
  offers: null,
  pollCountdown: initialCountdown,
  printingServiceComplete: null
}

function handlePriceRequested (state, {payload: {priceId}, error}) {
  return {
    ...state,
    priceId,
    pollCountdown: initialCountdown,
    error: !!error
  }
}

function handlePriceReceived (state, {payload: {offers, printingServiceComplete, error}}) {
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
    error: false
  }
}

function handlePollingFailed (state) {
  return {
    ...state,
    pollCountdown: state.pollCountdown - 1
  }
}

export default handleActions({
  [TYPE.PRICE.REQUESTED]: handlePriceRequested,
  [TYPE.PRICE.RECEIVED]: handlePriceReceived,
  [TYPE.PRICE.POLLING_FAILED]: handlePollingFailed
}, initialState)
