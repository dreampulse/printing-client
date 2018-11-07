// @flow
// Not using the "global" object here so that flow picks up the correct types.
/* global fetch, Headers, XMLHttpRequest, FormData */
// import 'whatwg-fetch'

import type {HttpUploadOptions} from '../type'
import {HttpUploadError} from '../lib/error'

// If fetch is called on a different object, an illegal invocation error is thrown. Therefore we need to bind() it.
// const boundFetch = fetch.bind(null)

// export {Headers, boundFetch as fetch}

// TODO: here is something wrong

const responseFromXhr = (xhr: XMLHttpRequest): Response =>
  new Response(xhr.responseText, {
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr
      .getAllResponseHeaders()
      .trim()
      .split(/[\r\n]+/)
      .map(line => line.split(': '))
      .reduce((headers: Headers, [key, value]): Headers => {
        headers.append(key, value)
        return headers
      }, new Headers())
  })

export const upload = ({
  url,
  body,
  headers,
  method = 'POST',
  onProgress
}: HttpUploadOptions): Promise<Response> =>
  new Promise((resolve, reject) => {
    const urlAsString = url.toString()
    const methodUppercase = method.toUpperCase()
    const xhr = new XMLHttpRequest()
    const form = new FormData()
    const rejectWithUploadErrorWhileUploading = () =>
      reject(new HttpUploadError(methodUppercase, urlAsString, HttpUploadError.PHASE_UPLOADING))
    const rejectWithUploadErrorWhileDownloading = () =>
      reject(new HttpUploadError(methodUppercase, urlAsString, HttpUploadError.PHASE_DOWNLOADING))

    if (onProgress) {
      xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
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
      form.append(key, value)
    })
    xhr.send(form)
  })
