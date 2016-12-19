import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'
import pollApi from '../lib/poll-api'
import { createUser } from './user'
import { getMaterials } from './material'

export const createPriceRequest = () => async (dispatch, getState) => {
  const userPromise = dispatch(createUser())
  const materialPromise = dispatch(getMaterials())
  await userPromise
  await materialPromise

  const modelId = getState().model.modelId
  const userId = getState().user.userId
  const materials = getState().material

  const materialId = Object.keys(materials)[0]

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
