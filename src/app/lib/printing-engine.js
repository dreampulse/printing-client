// @flow
import uniqueId from 'lodash/uniqueId'
import flattenDeep from 'lodash/flattenDeep'

import type {Dispatch} from 'redux'
import type {BackendModel, Action, BackendQuote} from '../type-next'

let uploadCounter = -1

export const uploadModel = (
  file: File,
  params: {unit: string},
  dispatch: Dispatch<any>,
  onProgress: (process: number) => Action<any>
): Promise<BackendModel> => {
  uploadCounter++

  if (uploadCounter % 3 === 1) {
    setTimeout(() => dispatch(onProgress(0.4)), 0)
    return new Promise(() => {}) // This promise never resolves
  }

  if (uploadCounter % 3 === 2) {
    return Promise.reject(new Error('some-error-message'))
  }

  return Promise.resolve({
    modelId: `some-model-${uploadCounter}`,
    fileName: `some-file-name-${uploadCounter}`,
    dimensions: {
      x: 23.3,
      y: 42.2,
      z: 0.815
    },
    thumbnailUrl: 'http://placehold.it/130x98',
    fileUnit: 'mm',
    area: 42,
    volume: 23
  })
}

type PriceRequestModel = {
  id: string,
  quantity: number
}

type PriceRequestResponse = {
  priceId: string
}

const priceRequests = {}

export const requestPrice = (
  currency: string,
  models: Array<PriceRequestModel>,
  materialConfigIds: Array<number>
): Promise<PriceRequestResponse> => {
  const priceId = uniqueId('price-id-')
  priceRequests[priceId] = {
    currency,
    requestCount: 0,
    models,
    materialConfigIds
  }

  return Promise.resolve({
    priceId
  })
}

type PrintingServicePriceState = {
  [printingServiceName: string]: boolean
}

type RequestPriceIdResponse = {
  printingServiceComplete: PrintingServicePriceState,
  quotes: Array<BackendQuote>
}

export const requestPriceId = (priceId: string): Promise<RequestPriceIdResponse> => {
  const printingServiceComplete = {
    imaterialize: priceRequests[priceId].requestCount >= 0,
    sculpteo: priceRequests[priceId].requestCount >= 1,
    shapeways: priceRequests[priceId].requestCount >= 2
  }

  priceRequests[priceId].requestCount++

  const quotes = flattenDeep(
    priceRequests[priceId].materialConfigIds.map(materialConfigId =>
      priceRequests[priceId].models.map(model => ({
        quoteId: uniqueId('quote-id-'),
        vendorId: ['sculpteo', 'imaterialize', 'shapeways'][Math.floor(Math.random() * 3)],
        modelId: model.id,
        materialConfigId,
        price: Math.floor(Math.random() * 1000),
        quantity: model.quantity,
        currency: priceRequests[priceId].currency,
        isPrintable: true
      }))
    )
  )

  return Promise.resolve({
    printingServiceComplete,
    quotes
  })
}
