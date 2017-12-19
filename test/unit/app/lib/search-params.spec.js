import URLSearchParams from 'url-search-params'
import * as searchParams from 'App/service/search-params'
import {getSearchParams, getUtmParams} from 'App/lib/search-params'

describe('Search Params Lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(searchParams, 'fromLocationSearch')
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('getSearchParams()', () => {
    it('returns an empty object when there are no search params', () => {
      const urlSearchParams = new URLSearchParams()

      searchParams.fromLocationSearch.returns(urlSearchParams)

      expect(getSearchParams(), 'to equal', {})
    })

    it('returns an object with param name as keys and param value as properties', () => {
      const urlSearchParams = new URLSearchParams()

      urlSearchParams.set('a', 'some string')
      urlSearchParams.set('b', 'some other string')
      searchParams.fromLocationSearch.returns(urlSearchParams)

      expect(getSearchParams(), 'to equal', {
        a: 'some string',
        b: 'some other string'
      })
    })
  })

  describe('getUtmParams()', () => {
    it('returns an empty object when there are no UTM params', () => {
      const urlSearchParams = new URLSearchParams()

      searchParams.fromLocationSearch.returns(urlSearchParams)

      expect(getUtmParams(), 'to equal', {})
    })

    it('returns an object with the defined UTM params', () => {
      const urlSearchParams = new URLSearchParams()

      urlSearchParams.set('utm_source', 'some source')
      searchParams.fromLocationSearch.returns(urlSearchParams)

      expect(getUtmParams(), 'to equal', {
        source: 'some source'
      })
    })

    it('recognizes all five UTM params', () => {
      const urlSearchParams = new URLSearchParams()

      urlSearchParams.set('utm_source', 'some source')
      urlSearchParams.set('utm_medium', 'some medium')
      urlSearchParams.set('utm_campaign', 'some campaign')
      urlSearchParams.set('utm_term', 'some term')
      urlSearchParams.set('utm_content', 'some content')
      searchParams.fromLocationSearch.returns(urlSearchParams)

      expect(getUtmParams(), 'to equal', {
        source: 'some source',
        medium: 'some medium',
        campaign: 'some campaign',
        term: 'some term',
        content: 'some content'
      })
    })
  })
})
