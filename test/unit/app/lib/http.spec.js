import * as http from '../../../../src/app/service/http-next'
import {fetchJson} from '../../../../src/app/lib/http'
import {
  HttpResponseUnexpectedStatusError,
  HttpResponseBodyParseError
} from '../../../../src/app/lib/error'

const expectAnything = expect.it(() => {})

describe('http lib', () => {
  let headersMock
  let responseMock
  let sandbox

  beforeEach(() => {
    headersMock = {
      set: () => {}
    }
    responseMock = {
      ok: true,
      json: () => {},
      text: () => {}
    }
    sandbox = sinon.sandbox.create()
    sandbox.stub(http, 'fetch').resolves(responseMock)
    sandbox.stub(http, 'Headers').returns(headersMock)
  })
  afterEach(() => {
    sandbox.restore()
  })
  describe('fetchJson()', () => {
    it('calls http.fetch() with the given url', async () => {
      await fetchJson('http://example.com')
      expect(http.fetch, 'to have a call satisfying', ['http://example.com', expectAnything])
    })

    it('calls http.fetch() with default headers', async () => {
      headersMock.set = sinon.spy()
      await fetchJson('http://example.com')
      expect(http.fetch, 'to have a call satisfying', [
        expectAnything,
        {
          headers: expect.it(headers => {
            expect(headers.set, 'to have a call satisfying', ['Content-Type', 'application/json'])
          })
        }
      ])
    })

    it('allows to set custom headers', async () => {
      const customHeaders = {
        Some: 'Header'
      }

      await fetchJson('http://example.com', {
        headers: customHeaders
      })
      expect(http.Headers, 'to have a call satisfying', [customHeaders])
    })

    it('stringifies the body if present', async () => {
      const body = {some: 'value'}

      await fetchJson('http://example.com', {
        body
      })
      expect(http.fetch, 'to have a call satisfying', [
        expectAnything,
        {
          headers: expectAnything,
          body: JSON.stringify(body)
        }
      ])
    })

    it('parses the JSON response', async () => {
      responseMock.json = sinon.spy()
      await fetchJson('http://example.com')
      expect(responseMock.json, 'to have a call satisfying', [])
    })

    it('returns the json and the raw response', async () => {
      const json = {some: 'value'}

      sinon.stub(responseMock, 'json').resolves(json)
      expect(await fetchJson('http://example.com'), 'to satisfy', {
        json,
        response: responseMock
      })
    })

    it('throws a HttpResponseUnexpectedStatusError if the response was not ok', async () => {
      let error

      responseMock.ok = false

      sinon.stub(responseMock, 'text').resolves('Raw text response')
      try {
        await fetchJson('http://example.com')
      } catch (err) {
        error = err
      }

      expect(
        error,
        'to equal',
        new HttpResponseUnexpectedStatusError('2xx', responseMock, 'Raw text response')
      )
    })

    it('initializes HttpResponseUnexpectedStatusError with a bodyText being null when the raw text response was not available', async () => {
      let error

      responseMock.ok = false

      sinon.stub(responseMock, 'text').rejects(new Error('Something went really really wrong'))
      try {
        await fetchJson('http://example.com')
      } catch (err) {
        error = err
      }

      expect(error, 'to equal', new HttpResponseUnexpectedStatusError('2xx', responseMock, null))
    })

    it('throws a HttpResponseBodyParseError if response.json() rejected with an error', async () => {
      const someError = new Error('Some error')
      let error

      sinon.stub(responseMock, 'json').rejects(someError)
      sinon.stub(responseMock, 'text').resolves('Raw text response')
      try {
        await fetchJson('http://example.com')
      } catch (err) {
        error = err
      }

      expect(
        error,
        'to equal',
        new HttpResponseBodyParseError(someError.message, responseMock, 'Raw text response')
      )
    })

    it('initializes HttpResponseUnexpectedStatusError with a bodyText being null when the raw text response was not available', async () => {
      const someError = new Error('Some error')
      let error

      sinon.stub(responseMock, 'json').rejects(someError)
      sinon.stub(responseMock, 'text').rejects(new Error('Something went really really wrong'))
      try {
        await fetchJson('http://example.com')
      } catch (err) {
        error = err
      }

      expect(
        error,
        'to equal',
        new HttpResponseBodyParseError(someError.message, responseMock, null)
      )
    })
  })
})
