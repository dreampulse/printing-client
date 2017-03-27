import {createAction} from 'redux-actions'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

// TODO: what happens if I have multiple concurrent createPriceRequest() calls
// This would be easy with rxjs

const getFinalPrice = ({priceId}) => async (dispatch) => {
  await pollApi(async () => {
    const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
    dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
    return isComplete
  })
  // TODO: handle failed case
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
  const {payload: {priceId}} =
    await dispatch(createAction(TYPE.PRICE.REQUESTED)(priceRequestPromise))

  await dispatch(getFinalPrice({priceId}))
}
