import 'whatwg-fetch'

export const fetch = global.fetch

export async function request (url, options = {}) {
  options.headers = { 'Content-Type': 'application/json' }
  if (options.body) options.body = JSON.stringify(options.body)
  const response = await fetch(url, options)
  return checkStatus(response)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if (isJSON(response)) return response.json()
  } else {
    var error = new Error(response.statusText)
    error.status = response.status
    error.response = response
    throw error
  }
}

function isJSON({ headers }) {
  return headers._headers['content-type'].some(i => i.includes('application/json'))
}

export function upload (url, data, onProgress) {
  const xhr = new XMLHttpRequest()

  xhr.upload.addEventListener('progress', event => {
    if (event.lengthComputable) {
      const progress = event.loaded / event.total
      onProgress(progress)
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

  xhr.open('POST', url)
  xhr.send(data)

  return promise
}
