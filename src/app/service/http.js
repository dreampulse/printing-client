import 'whatwg-fetch'

export const fetch = global.fetch
export const Xhr = global.XMLHttpRequest

function isJSON ({headers}) {
  const contentType = headers.get('content-type')
  if (contentType) return contentType.indexOf('application/json') >= 0
  return false
}

export function checkStatus (response) {
  if (response.status >= 200 && response.status < 400) {
    if (isJSON(response)) return response.json()
    return null
  }

  const error = new Error(response.statusText)
  error.status = response.status
  error.response = response
  throw error
}

export async function requestJson (url, additionalOptions = {}) {
  const options = {
    ...additionalOptions
  }
  options.headers = {'Content-Type': 'application/json'}
  if (options.body) options.body = JSON.stringify(options.body)
  const response = await fetch(url, options)
  return checkStatus(response)
}

export async function request (url, options) {
  const response = await fetch(url, options)
  return checkStatus(response)
}

export function upload (url, file, params, onProgress) {
  const xhr = new Xhr()

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const progress = event.loaded / event.total
      if (onProgress) {
        onProgress(progress)
      }
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

  const form = new global.FormData()
  form.append('file', file)
  Object.keys(params).forEach((param) => {
    form.append(param, params[param])
  })

  xhr.open('POST', url)
  xhr.send(form)

  return promise
}
