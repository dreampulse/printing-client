import {bindActionCreators} from 'redux'
import {xprod} from 'ramda'

import * as actionCreator from '../action-creator'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const createPriceRequest = () => async (dispatch, getState) => {
  const {
    priceRequested,
    priceReceived
  } = bindActionCreators(actionCreator, dispatch)

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

  const {payload: {priceId}} = await priceRequested(printingEngine.createPriceRequest(options))
  await pollApi(() => printingEngine.getPriceStatus({priceId}))
  return priceReceived(printingEngine.getPrice({priceId}))
}
