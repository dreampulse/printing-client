import config from '../../../config'
import {upload, requestJson, fetch} from '../service/http'

const baseUrl = config.printingEngineBaseUrl

export const uploadModel = (file, params, onProgress) =>
  upload(`${baseUrl}/model`, file, params, onProgress)

export const getUploadStatus = async ({modelId}) => {
  const response = await fetch(`${baseUrl}/model/${modelId}`)
  return response.status === 200
}

export const listMaterials = () => requestJson(`${baseUrl}/material`)

export const createUser = ({user}) => requestJson(`${baseUrl}/user`, {method: 'POST', body: user})

export const updateUser = ({userId, user}) => requestJson(`${baseUrl}/user/${userId}`, {method: 'PUT', body: user})

export const createPriceRequest = ({items, userId}) =>
  requestJson(`${baseUrl}/price`, {
    method: 'POST',
    body: {items, userId}
  })

export const getPrice = ({priceId}) => requestJson(`${baseUrl}/price/${priceId}`)

export const getPriceStatus = async ({priceId}) => {
  const response = await fetch(`${baseUrl}/price/${priceId}`)
  return response.status === 200
}

export const createShoppingCart = ({userId, priceId, items, shipping}) =>
  requestJson(`${baseUrl}/cart`, {
    method: 'POST',
    body: {userId, priceId, items, shipping}
  })

export const getFinalCartPrice = ({cartId}) =>
  requestJson(`${baseUrl}/cart/${cartId}`)

export const order = ({cartId, type, token}) =>
  requestJson(`${baseUrl}/order`, {
    method: 'POST',
    body: {
      cartId,
      payment: {
        type,
        token
      }
    }
  })
