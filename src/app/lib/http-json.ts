import {HttpJsonResponse, HttpUploadOptions} from '../type'
import {HttpResponseUnexpectedStatusError, HttpResponseBodyParseError} from './error'
import * as http from '../service/http'

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
  options: {
    headers?: {[header: string]: string}
    method?: string
    body?: any
  } = {}
): Promise<HttpJsonResponse> => {
  const fetchOptions: RequestInit = {
    headers: new http.Headers(options.headers || {'Content-Type': 'application/json'}),
    method: options.method || 'GET'
  }

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body)
  }

  return processResponse(await http.fetch(url, fetchOptions))
}

export const upload = async (options: HttpUploadOptions) =>
  processResponse(await http.upload(options))
