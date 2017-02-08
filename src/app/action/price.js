import {createAction} from 'redux-actions'

import TYPE from '../type'
import {createUser} from './user'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const createPriceRequest = () => async (dispatch, getState) => {
  const sa = getState().user.user.shippingAddress
  if (!sa.city || !sa.zipCode || !sa.stateCode || !sa.countryCode) return

  await dispatch(createUser())  // remove

  const options = {
    userId: getState().user.userId,
    modelId: getState().model.modelId,
    materialId: getState().material.selected
  }
  const {priceId} = await printingEngine.createPriceRequest(options)
  dispatch(createAction(TYPE.PRICE.REQUEST_CREATED)(priceId))

  try {
    await pollApi(() => printingEngine.getPriceStatus({priceId}))
    const price = await printingEngine.getPrice({priceId})
    dispatch(createAction(TYPE.PRICE.RECEIVED)(price))
  } catch (e) {
    dispatch(createAction(TYPE.PRICE.ERROR)(e))
  }
}
