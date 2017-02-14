import {xprod} from 'ramda'
import {createAction} from 'redux-actions'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const createPriceRequest = () => async (dispatch, getState) => {
  const sa = getState().user.user.shippingAddress
  if (!sa.city || !sa.zipCode || !sa.stateCode || !sa.countryCode) {
    throw new Error('Shipping Address Invalid')
  }

  const materialIds = Object.keys(getState().material.materials)
  const modelIds = getState().model.models.map(model => model.modelId)

  const items = xprod(materialIds, modelIds).map(([materialId, modelId]) => ({
    modelId,
    materialId
  }))

  const options = {
    userId: getState().user.userId,
    items
  }

  const priceRequestPromise = printingEngine.createPriceRequest(options)
  const {payload: {priceId}} =
    await dispatch(createAction(TYPE.PRICE.REQUESTED)(priceRequestPromise))

  const pricePromise = printingEngine.getPrice({priceId})
  await pollApi(() => printingEngine.getPriceStatus({priceId}))

  return dispatch(createAction(TYPE.PRICE.RECEIVED)(pricePromise))
}
