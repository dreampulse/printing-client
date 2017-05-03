import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {getUpdatedOffer} from 'Lib/offer'
import {poll, debouncedPoll} from 'Lib/poll'

import TYPE from '../type'

import {selectOffer} from './cart'

// Private actions

const clearOffers = createAction(TYPE.PRICE.CLEAR_OFFERS)
const priceRequested = createAction(
  TYPE.PRICE.REQUESTED,
  priceId => ({priceId})
)
const priceReceived = createAction(
  TYPE.PRICE.RECEIVED,
  price => ({price})
)

// Public actions

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
  })
  // TODO: handle error
  // Handle special error when price request was overwritten

  // We need to update the selectedOffer if applicable
  const {
    cart: {
      selectedOffer
    },
    price: {
      offers
    }
  } = getState()
  if (selectedOffer) {
    const offer = getUpdatedOffer(selectedOffer, offers)
    // if (!offer) // TODO: show that offer is no longer available
    await dispatch(selectOffer({offer}))
  }
}

export const createDebouncedPriceRequest = () => createPriceRequest(true)
