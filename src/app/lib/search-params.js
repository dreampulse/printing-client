// @flow

import {fromLocationSearch} from '../service/search-params'

export type SearchParams = {
  [paramName: string]: string
}

export type UtmParams = {
  source?: string,
  medium?: string,
  campaign?: string,
  term?: string,
  content?: string
}

const UTM_PARAM_PREFIX = 'utm_'
const UTM_PARAM_NAMES = ['source', 'medium', 'campaign', 'term', 'content']

export const getSearchParams = (): SearchParams => {
  const params = fromLocationSearch()
  const result: SearchParams = {}

  Array.from(params.keys()).forEach(paramName => {
    result[paramName] = params.get(paramName)
  })

  return result
}

export const getUtmParams = (): UtmParams => {
  const searchParams = getSearchParams()
  const result: UtmParams = {}

  UTM_PARAM_NAMES.forEach(paramName => {
    const paramValue = searchParams[UTM_PARAM_PREFIX + paramName]

    if (paramValue) {
      result[paramName] = paramValue
    }
  })

  return result
}
