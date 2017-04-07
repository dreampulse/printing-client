import {createAction} from 'redux-actions'
import debounce from 'lodash/debounce'

import * as printingEngine from 'Lib/printing-engine'
import {getUpdatedOffer} from 'Lib/offer'

import config from '../../../config'
import TYPE from '../type'

import {selectOffer} from './cart'

export const pollFinalPrice = () => (dispatch, getState) => {
  const interval = config.pollingInverval

  return new Promise((resolve, reject) => {
    const pollApi = async () => {
      const priceId = getState().price.priceId
      const shouldContinueWithPolling = getState().price.pollCountdown > 0
      if (shouldContinueWithPolling) {
        const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
        dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
        if (isComplete) {
          // Done polling
          resolve()
        } else {
          // Retry polling
          dispatch(createAction(TYPE.PRICE.POLLING_FAILED)())
          setTimeout(pollApi, interval)
        }
      } else {
        // Give up polling
        dispatch(createAction(TYPE.PRICE.RECEIVED)({error: true}))
        reject()
      }
    }

    pollApi()  // Start initial polling
  })
}

const priceRequest = async (dispatch, getState) => {
  dispatch(createAction(TYPE.PRICE.CLEAR_OFFERS)())

  const sa = getState().user.user.shippingAddress
  if (!sa.city || !sa.zipCode || !sa.stateCode || !sa.countryCode) {
    throw new Error('Shipping Address Invalid')
  }

  const {
    material: {
      materials: {
        materialConfigs
      }
    },
    model: {
      models
    }
  } = getState()

  const materialConfigIds = Object.keys(materialConfigs)
  const items = Object.keys(models).map(modelId => ({
    modelId,
    materialConfigIds,
    quantity: models[modelId].quantity
  }))

  const lastPriceId = getState().price.priceId

  // Abort if user did not upload any models yet
  if (items.length === 0) {
    return
  }

  const options = {
    userId: getState().user.userId,
    items
  }

  if (lastPriceId) {
    options.lastPriceId = lastPriceId
  }

  const priceRequestPromise = printingEngine.createPriceRequest(options)

  await dispatch(createAction(TYPE.PRICE.REQUESTED)(priceRequestPromise))
  await dispatch(pollFinalPrice())

  // We need to update the selectedOffer if applicable
  if (getState().cart.selectedOffer) {
    const offer = getUpdatedOffer(getState().cart.selectedOffer, getState().price.offers)
    // if (!offer) // TODO: show that offer is no longer available
    await dispatch(selectOffer({offer}))
  }
}
const debouncedPriceRequest = debounce(
  priceRequest,
  config.debouncePriceRequestWait
)

export const createPriceRequest = () => priceRequest
export const createDebouncedPriceRequest = () => debouncedPriceRequest
