import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {getUpdatedOffer} from 'Lib/offer'
import {poll, debouncedPoll} from 'Lib/poll'
import {openFatalErrorModal} from 'Action/modal'
import TYPE, {ERROR_TYPE} from '../type'

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

export const createPriceRequest = (debounce = false) => async (dispatch, getState) => {
  dispatch(clearOffers())

  const {
    material: {
      materials: {
        materialConfigs
      }
    },
    model: {
      models
    },
    price: {
      priceId: lastPriceId
    },
    user: {
      userId
    }
  } = getState()

  const materialConfigIds = Object.keys(materialConfigs)
  const items = Object.keys(models).map(modelId => ({
    modelId,
    materialConfigIds,
    quantity: models[modelId].quantity
  }))

  // Abort if user did not upload any models yet
  if (items.length === 0) {
    return
  }

  const options = {
    userId,
    items
  }
  if (lastPriceId) {
    options.lastPriceId = lastPriceId
  }

  const usePoll = debounce ? debouncedPoll : poll
  await usePoll('price', async (priceId) => {
    const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
    dispatch(priceReceived(price))
    return isComplete
  }, async () => {
    const {priceId} = await printingEngine.createPriceRequest(options)
    dispatch(priceRequested(priceId))
    return priceId
  }).catch((error) => {
    // Ignore special error when price request was overwritten
    if (error.type !== ERROR_TYPE.POLL_OVERWRITTEN) {
      dispatch(priceReceived(error))
      dispatch(openFatalErrorModal(error))
    }
  })

  // We need to update the selectedOffer if applicable
  dispatch(refreshSelectedOffer())
}

export const createDebouncedPriceRequest = () => createPriceRequest(true)
