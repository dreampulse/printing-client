import URLSearchParams from 'url-search-params'
import * as searchParams from 'App/service/search-params'
import {getSearchParams} from 'App/lib/search-params'

describe('Search Params Lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(searchParams, 'fromLocationSearch')
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('getSearchParams', () => {
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
})
