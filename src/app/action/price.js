import {xprod} from 'ramda'
import {createAction} from 'redux-actions'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

// TODO: what happens if I have multiple concurrent createPriceRequest() calls
// This would be easy with rxjs

export const getFinalPrice = ({priceId}) => async (dispatch) => {
  await pollApi(async () => {
    const {price, isComplete} = await printingEngine.getPriceWithStatus({priceId})
    dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
    return isComplete
  })
  // TODO: handle failed case
}

export const createPriceRequest = () => async (dispatch, getState) => {
  const sa = getState().user.user.shippingAddress
  // TODO: Issue #35
  if (!sa.city || !sa.zipCode || !sa.stateCode || !sa.countryCode) {
    throw new Error('Shipping Address Invalid')
  }

  const materialIds = Object.keys(getState().material.materials.materialConfigs)
  const modelIds = Object.keys(getState().model.models)

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

  await dispatch(getFinalPrice({priceId}))
}
