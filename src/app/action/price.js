import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {getUpdatedOffer} from 'Lib/offer'
import {poll, debouncedPoll, stopPoll} from 'Lib/poll'
import {selectFeatures} from 'Lib/selector'
import TYPE, {ERROR_TYPE} from '../type'

const POLL_NAME = 'price'
const RECALC_POLL_NAME = 'price_recalc'

// Private actions

const clearOffers = createAction(TYPE.PRICE.CLEAR_OFFERS)
const priceRequested = createAction(
  TYPE.PRICE.REQUESTED,
  priceId => ({priceId})
)
const priceReceived = createAction(
  TYPE.PRICE.RECEIVED,
  (price, isComplete) => ({price, isComplete})
)
const priceTimeout = createAction(TYPE.PRICE.TIMEOUT)

// Public actions

export const selectOffer = createAction(
  TYPE.PRICE.SELECT_OFFER,
  offer => ({offer})
)

export const refreshSelectedOffer = () => (dispatch, getState) => {
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

export const createPriceRequest = ({
  debounce = false
} = {}) => (dispatch, getState) => {
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
  const items = models.map(({modelId, quantity}) => ({
    modelId,
    materialConfigIds,
    quantity
  }))

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
    dispatch(priceReceived(price))
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
  .catch((error) => {
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

    dispatch(priceReceived(error))

    // Throw again to trigger fatal error modal
    throw error
  })
}

export const recalculateSelectedOffer = () => (dispatch, getState) => {
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

  // Stop any other price polling
  stopPoll(POLL_NAME)

  const items = models.map(({modelId, quantity}) => ({
    modelId,
    materialConfigIds: [selectedOffer.materialConfigId],
    quantity
  }))

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

    dispatch(priceReceived(error))

    // Throw again to trigger fatal error modal
    throw error
  })
}

export const createDebouncedPriceRequest = () => createPriceRequest({debounce: true})
