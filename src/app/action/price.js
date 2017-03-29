import {createAction} from 'redux-actions'

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
        if (isComplete) {
          // Done polling
          dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
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

export const createPriceRequest = () => async (dispatch, getState) => {
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

  const options = {
    userId: getState().user.userId,
    items
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
