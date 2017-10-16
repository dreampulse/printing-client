// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {getUpdatedOffer} from 'Lib/offer'
import {poll, debouncedPoll, stopPoll} from 'Lib/poll'
import {selectFeatures} from 'Lib/selector'

import type {Offer, Price, State} from '../type'
import TYPE, {ERROR_TYPE} from '../action-type'

const POLL_NAME = 'price'
const RECALC_POLL_NAME = 'price_recalc'

// Sync actions

const clearOffers = createAction(TYPE.PRICE.CLEAR_OFFERS)
const priceRequested = createAction(
  TYPE.PRICE.REQUESTED,
  (priceId : string) => ({priceId})
)
const priceReceived = createAction(
  TYPE.PRICE.RECEIVED,
  (price : Price, isComplete : boolean) => ({price, isComplete})
)
const gotError = createAction(
  TYPE.PRICE.GOT_ERROR,
  (error: Error) => error
)
const priceTimeout = createAction(TYPE.PRICE.TIMEOUT)
export const selectOffer = createAction(
  TYPE.PRICE.SELECT_OFFER,
  (offer : ?Offer) => ({offer})
)

// Asnyc actions

export const refreshSelectedOffer = () => (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const {
    price: {
      offers,
      selectedOffer
    }
  } = getState()

  if (selectedOffer) {
    const offer = offers ? getUpdatedOffer(selectedOffer, offers) : null
    // if (!offer) // TODO: show that offer is no longer available
    dispatch(selectOffer(offer))
  }
}

// @TODO: Improve interface
export const createPriceRequest = ({
  debounce = false
} : {
  refresh : boolean,
  debounce : boolean
} = {}) => (
  dispatch : Dispatch<*>,
  getState : () => State
) : Promise<any> => {
  dispatch(clearOffers())

  const state = getState()
  const {
    material: {
      materials: {
        materialConfigs
      }
    },
    model: {
      models
    },
    user: {
      userId
    }
  } = state
  const {refresh} = selectFeatures(state)

  // Abort if user did not upload any models yet
  if (models.length === 0) {
    // Just to be sure, stop any running price polls
    stopPoll(POLL_NAME)
    return Promise.resolve()
  }

  const materialConfigIds = Object.keys(materialConfigs)
  const items = models.map((model) => {
    if (!model.uploadFinished) throw new Error('Upload still in progress')
    const {modelId, quantity} = model
    return {
      modelId,
      materialConfigIds,
      quantity
    }
  })

  const options = {
    isEstimate: false, // always fetch real prices
    caching: true, // cache prices for next user
    refresh, // force refresh when requested
    userId,
    items
  }

  const usePoll = debounce ? debouncedPoll : poll
  return usePoll(POLL_NAME, async (priceId) => {
    const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
    dispatch(priceReceived(price, isComplete))
    return isComplete
  }, async () => {
    const {priceId} = await printingEngine.createPriceRequest(options)
    dispatch(priceRequested(priceId))
    return priceId
  })
  .then(() => {
    // We need to update the selectedOffer if applicable
    dispatch(refreshSelectedOffer())
  })
  .catch((error : Error) => {
    // Handle timeout separately
    if (error.type === ERROR_TYPE.POLL_TIMEOUT) {
      dispatch(priceTimeout(error))
      return
    }

    // Ignore special error when price request was overwritten or stopped
    if (error.type === ERROR_TYPE.POLL_OVERWRITTEN ||
      error.type === ERROR_TYPE.POLL_STOPPED) {
      return
    }

    dispatch(gotError(error))

    // Throw again to trigger fatal error modal
    throw error
  })
}

export const recalculateSelectedOffer = () => (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const {
    model: {
      models
    },
    price: {
      selectedOffer
    },
    user: {
      userId
    }
  } = getState()

  if (!selectedOffer) throw new Error('No offer selected')

  // Stop any other price polling
  stopPoll(POLL_NAME)

  const items = models.map((model) => {
    if (!model.uploadFinished) throw new Error('Upload still in progress')
    const {modelId, quantity} = model
    return {
      modelId,
      materialConfigIds: [selectedOffer.materialConfigId],
      quantity
    }
  })

  const options = {
    isEstimate: false, // always get real price for recalculated offer
    caching: false, // do not cache price recalc with a single material/vendor
    vendorId: selectedOffer.printingService,
    userId,
    items
  }

  return poll(RECALC_POLL_NAME, async (priceId) => {
    const {price} = await printingEngine.getPriceWithStatus({priceId})
    const updatedOffer = getUpdatedOffer(selectedOffer, price.offers)

    if (!updatedOffer || updatedOffer.priceEstimated) {
      return false
    }

    dispatch(selectOffer(updatedOffer))

    return true
  }, async () => {
    const {priceId} = await printingEngine.createPriceRequest(options)
    dispatch(priceRequested(priceId))
    return priceId
  })
  .catch((error) => {
    // Every error here is fatal!

    dispatch(gotError(error))

    // Throw again to trigger fatal error modal
    throw error
  })
}

export const createDebouncedPriceRequest = () =>
  createPriceRequest({debounce: true, refresh: false})
