// TODO refactor into a easily testable lib with API v3
// DEPRECATED!

import config from '../../../config'
import {upload, requestJson, requestWithResponse, fetch} from '../service/http'

const baseUrl = config.printingEngineBaseUrl

export const uploadModel = (file, params, onProgress) =>
  upload(`${baseUrl}/v2/model`, file, params, onProgress)

export const listMaterials = () => requestJson(`${baseUrl}/v3/material`)

export const createUser = ({user}) => requestJson(`${baseUrl}/v2/user`, {method: 'POST', body: user})

export const updateUser = ({userId, user}) =>
  requestJson(`${baseUrl}/v2/user/${userId}`, {method: 'PUT', body: user})

export const createPriceRequest = options =>
  requestJson(`${baseUrl}/v2/price`, {
    method: 'POST',
    body: options
  })

export const getPrice = ({priceId}) => requestJson(`${baseUrl}/v2/price/${priceId}`)

export const getPriceStatus = async ({priceId}) => {
  const response = await fetch(`${baseUrl}/v2/price/${priceId}`)
  return response.status === 200
}

export const getPriceWithStatus = async ({priceId}) => {
  const response = await requestWithResponse(`${baseUrl}/v2/price/${priceId}`)
  return {
    price: response.data,
    isComplete: response.rawResponse.status === 200
  }
}

export const createShoppingCart = cart =>
  requestJson(`${baseUrl}/v2/cart`, {
    method: 'POST',
    body: cart
  })

export const getFinalCartPrice = ({cartId}) => requestJson(`${baseUrl}/v2/cart/${cartId}`)

export const order = ({userId, priceId, offerIds, utmParams}) =>
  requestJson(`${baseUrl}/v2/order`, {
    method: 'POST',
    body: {
      userId,
      priceId,
      offerIds,
      utmParams
    }
  })

export const createConfiguration = configuration =>
  requestJson(`${baseUrl}/v2/configuration`, {
    method: 'POST',
    body: configuration
  })

export const getConfiguration = configurationId =>
  requestJson(`${baseUrl}/v2/configuration/${configurationId}`)

export const createPaypalPayment = ({orderId, transactions}) =>
  requestJson(`${baseUrl}/v2/payment/paypal`, {
    method: 'POST',
    body: {orderId, transactions}
  })

export const createInvoicePayment = ({orderId, token}) =>
  requestJson(`${baseUrl}/v2/payment/invoice`, {
    method: 'POST',
    body: {token, orderId}
  })

export const createStripePayment = ({orderId, token}) => {
  requestJson(`${baseUrl}/v2/payment/stripe`, {
    method: 'POST',
    body: {
      orderId,
      token
    }
  })
}

export const executePaypalPayment = ({payerId, paymentId}) =>
  requestJson(`${baseUrl}/v2/payment/paypal/${paymentId}`, {
    method: 'PUT',
    body: {payerId}
  })
