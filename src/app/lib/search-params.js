// @flow

import {fromLocationSearch} from '../service/search-params'

type SearchParams = {
  [paramName: string]: string
}

export const getSearchParams = (): SearchParams => {
  const params = fromLocationSearch()
  const result = {}

  Array.from(params.keys()).forEach(paramName => {
    result[paramName] = params.get(paramName)
  })

  return result
}
