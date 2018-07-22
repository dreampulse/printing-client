// @flow

import URLSearchParams from 'url-search-params'

import type {Features} from '../type-next'

// TODO: copy tests from old selector lib
export const getFeatureFlags = (location: Location) => {
  const searchParams = new URLSearchParams(location.search || '')

  const features: Features = {}

  Array.from(searchParams.keys())
    .filter(name => /^feature:/.test(name))
    .map(name => name.substr('feature:'.length))
    .forEach((name: string) => {
      features[name] = true
    })

  return features
}
