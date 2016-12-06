import fetch from '../../service/fetch'

// const baseUrl = 'http://localhost:8000/v1'
const baseUrl = 'https://printing-engine.all3dp.com/v1'

export const uploadModel = (form, onProgressChange) => {
  const xhr = new XMLHttpRequest()

  xhr.upload.addEventListener('progress', event => {
    if (event.lengthComputable) {
      const progress = event.loaded / event.total
      onProgressChange(progress)
    }
  })

  const promise = new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(xhr.responseText)
        }
      }
    }
  })

  xhr.open('POST', baseUrl + '/model')
  xhr.send(form)

  return promise
}

export const getUploadStatus = ({modelId}) =>
  fetch(baseUrl + '/model/' + modelId)
    .then(response => response.status === 200)
    .catch(() => false)

export const listMaterials = () => http('/materials')

export const createUser = ({user}) => http('/user', {method: 'POST', body: user})

export const createPriceRequest = ({modelId, materialId, userId}) =>
  http('/price', {
    method: 'POST',
    body: {items: [{modelId, materialId}], userId}
  })

export const getPrice = ({priceId}) => http('/price/' + priceId)

export const getMaterials = () => http('/materials')

async function http (path, options = {}) {
  options.headers = { 'Content-Type': 'application/json' }
  if (options.body) options.body = JSON.stringify(options.body)
  const response = await fetch(baseUrl + path, options)
  return response.json()
}
