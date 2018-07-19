// @flow

import type {HttpJsonResponse, HttpUploadOptions} from '../type-next'
import {HttpResponseUnexpectedStatusError, HttpResponseBodyParseError} from './error'
import * as http from '../service/http-next'

const getBodyTextIfPossible = async (response: Response): Promise<string | null> => {
  try {
    return await response.text()
  } catch (_) {
    return null
  }
}

const processResponse = async (response: Response): Promise<HttpJsonResponse> => {
  if (response.ok === false) {
    throw new HttpResponseUnexpectedStatusError(
      '2xx',
      response,
      await getBodyTextIfPossible(response)
    )
  }
  try {
    return {
      json: await response.json(),
      http: response
    }
  } catch (err) {
    throw new HttpResponseBodyParseError(
      err.message,
      response,
      await getBodyTextIfPossible(response)
    )
  }
}

export const fetch = async (
  url: string,
  options?: {
    headers?: Headers,
    method?: string,
    body?: any
  } = {}
): Promise<HttpJsonResponse> => {
  const headers = new http.Headers(options.headers)
  const fetchOptions: RequestOptions = {
    headers,
    method: options.method
  }

  headers.set('Content-Type', 'application/json')
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body)
  }

  return processResponse(await http.fetch(url, fetchOptions))
}

export const upload = async (options: HttpUploadOptions) =>
  processResponse(await http.upload(options))
