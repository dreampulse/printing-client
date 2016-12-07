import { upload, request, fetch } from '../../service/http'

export default ({config}) => {
  const baseUrl = config.printingEngineBaseUrl

  const uploadModel = (form, onProgressChange) => {
    return upload(baseUrl + '/model', form, onProgressChange)
  }

  const getUploadStatus = async ({modelId}) => {
    const response = await fetch(baseUrl + '/model/' + modelId)
    return response.status === 200
  }

  const listMaterials = () => request(baseUrl + '/material')

  const createUser = ({user}) => request(baseUrl + '/user', {method: 'POST', body: user})

  const createPriceRequest = ({modelId, materialId, userId}) =>
    request(baseUrl + '/price', {
      method: 'POST',
      body: {items: [{modelId, materialId}], userId}
    })

  const getPrice = ({priceId}) => request(baseUrl + '/price/' + priceId)

  return {
    uploadModel,
    getUploadStatus,
    listMaterials,
    createUser,
    createPriceRequest,
    getPrice
  }
}
