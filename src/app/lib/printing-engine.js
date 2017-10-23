import config from '../../../config'
import {upload, requestJson, requestWithResponse, fetch} from '../service/http'

const baseUrl = config.printingEngineBaseUrl

export const uploadModel = (file, params, onProgress) =>
  upload(`${baseUrl}/model`, file, params, onProgress)

export const listMaterials = () => requestJson(`${baseUrl}/material`)

export const createUser = ({user}) => requestJson(`${baseUrl}/user`, {method: 'POST', body: user})

export const updateUser = ({userId, user}) =>
  requestJson(`${baseUrl}/user/${userId}`, {method: 'PUT', body: user})

export const createPriceRequest = options =>
  requestJson(`${baseUrl}/price`, {
    method: 'POST',
    body: options
  })

export const getPrice = ({priceId}) => requestJson(`${baseUrl}/price/${priceId}`)

export const getPriceStatus = async ({priceId}) => {
  const response = await fetch(`${baseUrl}/price/${priceId}`)
  return response.status === 200
}

export const getPriceWithStatus = async ({priceId}) => {
  const response = await requestWithResponse(`${baseUrl}/price/${priceId}`)
  return {
    price: response.data,
    isComplete: response.rawResponse.status === 200
  }
}

export const createShoppingCart = cart =>
  requestJson(`${baseUrl}/cart`, {
    method: 'POST',
    body: cart
  })

export const getFinalCartPrice = ({cartId}) => requestJson(`${baseUrl}/cart/${cartId}`)

export const order = ({userId, priceId, offerId, type, token}) =>
  requestJson(`${baseUrl}/order`, {
    method: 'POST',
    body: {
      userId,
      priceId,
      offerId,
      payment: {
        type,
        token
      }
    }
  })

export const createConfiguration = configuration =>
  requestJson(`${baseUrl}/configuration`, {
    method: 'POST',
    body: configuration
  })

export const getConfiguration = configurationId =>
  requestJson(`${baseUrl}/configuration/${configurationId}`)
