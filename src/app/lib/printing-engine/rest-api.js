import { upload, request, fetch } from '../../service/http'

// const baseUrl = 'http://localhost:8000/v1'
const baseUrl = 'https://printing-engine.all3dp.com/v1'

export const uploadModel = (form, onProgressChange) => {
  return upload(baseUrl + '/model', form, onProgressChange)
}

export const getUploadStatus = async ({modelId}) => {
  const response = await fetch(baseUrl + '/model/' + modelId)
  return response.status === 200
}

export const listMaterials = () => request(baseUrl + '/material')

export const createUser = ({user}) => request(baseUrl + '/user', {method: 'POST', body: user})

export const createPriceRequest = ({modelId, materialId, userId}) =>
  request(baseUrl + '/price', {
    method: 'POST',
    body: {items: [{modelId, materialId}], userId}
  })

export const getPrice = ({priceId}) => request(baseUrl + '/price/' + priceId)
