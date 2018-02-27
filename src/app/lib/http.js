// @flow

import {HttpResponseUnexpectedStatusError, HttpResponseBodyParseError} from './error'
import * as http from '../service/http-next'

const getBodyTextIfPossible = async (response: Response): Promise<string | null> => {
  try {
    return await response.text()
  } catch (_) {
    return null
  }
}

export const fetchJson = async (
  url: RequestInfo,
  options?: {
    headers?: Headers,
    method?: string,
    body?: Object
  } = {}
): Promise<{
  json: any,
  response: Response
}> => {
  const headers = new http.Headers(options.headers)
  const fetchOptions: RequestOptions = {
    headers
  }

  headers.set('Content-Type', 'application/json')
  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body)
  }

  const response = await http.fetch(url, fetchOptions)

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
      response
    }
  } catch (err) {
    throw new HttpResponseBodyParseError(
      err.message,
      response,
      await getBodyTextIfPossible(response)
    )
  }
}
