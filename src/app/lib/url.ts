import URLSearchParams from 'url-search-params'
import zipObject from 'lodash/zipObject'

import {Features, UrlParams} from '../type'

export const getFeatureFlags = (location: Location) => {
  const searchParams = new URLSearchParams(location.search)

  const features: Features = {}

  Array.from((searchParams.keys() as unknown) as string[])
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .forEach((name: string) => {
      features[name] = true
    })

  return features
}

export const getUrlParams = (location: Location): UrlParams => {
  const searchParams = new URLSearchParams(location.search)

  return zipObject(
    Array.from((searchParams.keys() as unknown) as string[]),
    Array.from((searchParams.values() as unknown) as string[])
  )
}
