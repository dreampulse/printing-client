import {xprod} from 'ramda'
import {createAction} from 'redux-actions'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const priceRequested = createAction(TYPE.PRICE.REQUESTED)
export const priceReceived = createAction(TYPE.PRICE.RECEIVED)

// Async actions

export const createPriceRequest = () => async (dispatch, getState) => {
  const sa = getState().user.user.shippingAddress
  if (!sa.city || !sa.zipCode || !sa.stateCode || !sa.countryCode) {
    throw new Error('Shipping Address Invalid')
  }

  const materialIds = Object.keys(getState().material.materials)
  const modelIds = getState().model.models.map(model => model.modelId)

  const items = xprod(materialIds, modelIds)
    .map(([materialId, modelId]) => ({
      modelId,
      materialId
    }))

  const options = {
    userId: getState().user.userId,
    items
  }

  const {payload: {priceId}} = await dispatch(
    priceRequested(printingEngine.createPriceRequest(options))
  )
  await pollApi(() => printingEngine.getPriceStatus({priceId}))
  return dispatch(priceReceived(printingEngine.getPrice({priceId})))
}
