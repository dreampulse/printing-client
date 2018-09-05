import URLSearchParams from 'url-search-params'

import {getFeatureFlags, getUrlParams} from './url'

describe('getFeatureFlags()', () => {
  it('returns the feature toggles in an object without prototype', () => {
    const query = new URLSearchParams()
    const features = {
      a: true,
      b: true,
      c: true,
      d: true
    }

    query.append('feature:a', true)
    query.append('feature:b', '')
    query.append('feature:c', null)
    query.append('feature:d', false)

    expect(
      getFeatureFlags({
        search: query.toString()
      }),
      'to equal',
      features
    )
  })

  it('does not detect query parameters without "feature:" prefix as feature', () => {
    const query = new URLSearchParams()
    const features = {}

    query.append('a', true)
    query.append('b', '')
    query.append('c', null)
    query.append('d', false)

    expect(
      getFeatureFlags({
        search: query.toString()
      }),
      'to equal',
      features
    )
  })
})

describe('getUrlParams()', () => {
  it('return url params as object', () => {
    const query = new URLSearchParams()
    const params = {
      foo: 'bar',
      baz: 'foo'
    }

    query.append('foo', 'bar')
    query.append('baz', 'foo')

    expect(
      getUrlParams({
        search: query.toString()
      }),
      'to equal',
      params
    )
  })
})
