import config from '../../../config'
import {upload, request, fetch} from '../service/http'

const baseUrl = config.printingEngineBaseUrl

export const uploadModel = (file, onProgressChange, params) =>
  upload(`${baseUrl}/model`, file, onProgressChange, params)

export const getUploadStatus = async ({modelId}) => {
  const response = await fetch(`${baseUrl}/model/${modelId}`)
  return response.status === 200
}

export const listMaterials = () => request(`${baseUrl}/material`)

export const createUser = ({user}) => request(`${baseUrl}/user`, {method: 'POST', body: user})

export const updateUser = ({userId, user}) => request(`${baseUrl}/user/${userId}`, {method: 'PUT', body: user})

export const createPriceRequest = ({modelId, materialId, userId}) =>
  request(`${baseUrl}/price`, {
    method: 'POST',
    body: {items: [{modelId, materialId}], userId}
  })

export const getPrice = ({priceId}) => request(`${baseUrl}/price/${priceId}`)

export const getPriceStatus = async ({priceId}) => {
  const response = await fetch(`${baseUrl}/price/${priceId}`)
  return response.status === 200
}

export const createShoppingCart = ({userId, priceId, items, shipping}) =>
  request(`${baseUrl}/cart`, {
    method: 'POST',
    body: {userId, priceId, items, shipping}
  })

export const getFinalCartPrice = ({cartId}) =>
  request(`${baseUrl}/cart/${cartId}`)

export const order = ({cartId, type, token}) =>
  request(`${baseUrl}/order`, {
    method: 'POST',
    body: {
      cartId,
      payment: {
        type,
        token
      }
    }
  })
