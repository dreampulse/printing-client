import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'
import pollApi from '../lib/poll-api'

export const createPriceRequest = () => async (dispatch, getState) => {
  const user = {
    currency: 'USD',
    shippingAddress: {
      city: 'Pittsburgh',
      zipCode: '15234',
      stateCode: 'PA',
      countryCode: 'US'
    }
  }

  const modelId = getState().model.modelId

  const {userId} = await printingEngine.createUser({user})
  const materials = await printingEngine.listMaterials()
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
