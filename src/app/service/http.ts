import 'whatwg-fetch'

import {HttpUploadError, HttpUploadErrorPhase} from '../lib/error'
import {HttpUploadOptions} from '../type'

// If fetch is called on a different object, an illegal invocation error is thrown. Therefore we need to bind() it.
const boundFetch = fetch.bind(null)
const headersCopy = Headers

export {headersCopy as Headers, boundFetch as fetch}

const responseFromXhr = (xhr: XMLHttpRequest) =>
  new Response(xhr.responseText, {
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr
      .getAllResponseHeaders()
      .trim()
      .split(/[\r\n]+/)
      .map(line => line.split(': '))
      .reduce((headers, [key, value]) => {
        headers.append(key, value)
        return headers
      }, new Headers())
  })

export const upload = ({url, body, headers, method = 'POST', onProgress}: HttpUploadOptions): Promise<Response> =>
  new Promise((resolve, reject) => {
    const urlAsString = url.toString()
    const methodUppercase = method.toUpperCase()
    const xhr = new XMLHttpRequest()
    const form = new FormData()
    const rejectWithUploadErrorWhileUploading = () =>
      reject(new HttpUploadError(methodUppercase, urlAsString, HttpUploadErrorPhase.UPLOADING))
    const rejectWithUploadErrorWhileDownloading = () =>
      reject(new HttpUploadError(methodUppercase, urlAsString, HttpUploadErrorPhase.DOWNLOADING))

    if (onProgress) {
      xhr.upload.addEventListener('progress', event => {
        if (event.lengthComputable && onProgress) {
          onProgress(event.loaded / event.total)
        }
      })
    }

    xhr.upload.addEventListener('error', rejectWithUploadErrorWhileUploading)
    xhr.upload.addEventListener('abort', rejectWithUploadErrorWhileUploading)
    xhr.addEventListener('error', rejectWithUploadErrorWhileDownloading)
    xhr.addEventListener('abort', rejectWithUploadErrorWhileDownloading)
    xhr.addEventListener('load', () => resolve(responseFromXhr(xhr)))

    if (headers) {
      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value)
      })
    }

    xhr.open(method.toUpperCase(), urlAsString)
    Object.entries(body).forEach(([key, value]) => {
      form.append(key, value as any)
    })
    xhr.send(form)
  })
