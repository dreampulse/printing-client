import 'whatwg-fetch'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

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

export async function request (url, additionalOptions = {}) {
  const options = {
    ...additionalOptions
  }
  options.headers = {'Content-Type': 'application/json'}
  if (options.body) options.body = JSON.stringify(options.body)
  const response = await fetch(url, options)
  return checkStatus(response)
}

export function upload (url, file, params) {
  const result$ = new BehaviorSubject()
  const progress$ = new BehaviorSubject()

  const xhr = new Xhr()

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      const progress = event.loaded / event.total
      progress$.next(progress)
    }
  })

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        result$.next(JSON.parse(xhr.responseText))
        result$.complete()
        progress$.complete()
      } else {
        result$.throw(xhr.responseText)
        progress$.complete()
      }
    }
  }

  const form = new global.FormData()
  form.append('file', file)
  Object.keys(params).forEach((param) => {
    form.append(param, params[param])
  })

  xhr.open('POST', url)
  xhr.send(form)

  return {
    result$,
    progress$
  }
}
