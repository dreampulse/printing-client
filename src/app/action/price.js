import {xprod} from 'ramda'
import {createAction} from 'redux-actions'
import {Observable} from 'rxjs/Observable'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const priceRequested = createAction(TYPE.PRICE.REQUESTED)
export const priceReceived = createAction(TYPE.PRICE.RECEIVED)

// Async actions

export const createPriceRequest = createAction(TYPE.PRICE.CREATE)
export const createPriceRequestEpic = (action$, {getState}) =>
  action$.ofType(TYPE.PRICE.CREATE)
    .flatMap(() => {
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

      return Observable.fromPromise(printingEngine.createPriceRequest(options))
        .flatMap(({priceId}) => ([
          Observable.of(priceRequested({priceId})),
          Observable.fromPromise(
            pollApi(() => printingEngine.getPriceStatus({priceId}))
          ).flatMap(() =>
            printingEngine.getPrice({priceId})
          ).map(priceReceived)
          /* .catch(() =>
           Observable.of(checkStatusFinished({fileId, error: true}))
           ) */
        ]))
        .mergeAll()
    })

/*
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

*/
