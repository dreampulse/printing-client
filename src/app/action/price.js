import {createAction} from 'redux-actions'

import TYPE from '../type'
import { createUser } from './user'
import pollApi from '../lib/poll-api'
import { goToCart } from '../action/navigation'
import * as printingEngine from '../lib/printing-engine'

export const createPriceRequest = () => async (dispatch, getState) => {
  if (!getState().user.user.shippingAddress) return

  await dispatch(createUser())

  const modelId = getState().model.modelId
  const userId = getState().user.userId
  const materialId = getState().material.selected

  const {priceId} = await printingEngine.createPriceRequest({
    userId,
    modelId,
    materialId
  })

  dispatch(createAction(TYPE.PRICE.REQUEST_CREATED)(priceId))

  try {
    await pollApi(() => printingEngine.getPriceStatus({priceId}))
    const price = await printingEngine.getPrice({priceId})
    dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
  } catch (e) {
    dispatch(createAction(TYPE.PRICE.ERROR)(e))
  }
}

export const selectVendor = vendorId => dispatch => {
  dispatch(createAction(TYPE.PRICE.VENDOR_SELECTED)(vendorId))
  dispatch(goToCart())
}
