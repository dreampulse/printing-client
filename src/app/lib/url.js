// @flow

import URLSearchParams from 'url-search-params'
import zipObject from 'lodash/zipObject'

import type {Features, UrlParams} from '../type'

export const getFeatureFlags = (location: Location) => {
  const searchParams = new URLSearchParams(location.search)

  const features: Features = {}

  Array.from(searchParams.keys())
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .forEach((name: string) => {
      features[name] = true
    })

  return features
}

export const getUrlParams = (location: Location): UrlParams => {
  const searchParams = new URLSearchParams(location.search)

  return zipObject(Array.from(searchParams.keys()), Array.from(searchParams.values()))
}
