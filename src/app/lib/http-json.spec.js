import * as http from '../service/http'
import {fetch, upload, fetchWithRetry} from './http-json'
import {HttpResponseUnexpectedStatusError, HttpResponseBodyParseError} from './error'

const expectAnything = expect.it(() => {})

describe('http-json lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('fetch()', () => {
    let headersMock
    let responseMock

    beforeEach(() => {
      headersMock = {
        set: () => {}
      }
      responseMock = {
        ok: true,
        json: () => {},
        text: () => {}
      }
      sandbox.stub(http, 'fetch').resolves(responseMock)
      sandbox.stub(http, 'Headers').callsFake(function Headers(params) {
        this.params = params
      })
    })

    it('calls http.fetch() with the given url', async () => {
      await fetch('http://example.com')
      expect(http.fetch, 'to have a call satisfying', ['http://example.com', expectAnything])
    })

    it('calls http.fetch() with default method', async () => {
      headersMock.set = sinon.spy()
      await fetch('http://example.com')
      expect(http.fetch, 'to have a call satisfying', [
        expectAnything,
        {
          method: 'GET'
        }
      ])
    })

    it('calls http.fetch() with default headers', async () => {
      headersMock.set = sinon.spy()
      await fetch('http://example.com')
      expect(http.fetch, 'to have a call satisfying', [
        expectAnything,
        {
          headers: expect.it(headers => {
            expect(headers.params, 'to equal', {'Content-Type': 'application/json'})
          })
        }
      ])
    })

    it('allows to set custom headers', async () => {
      const customHeaders = {
        Some: 'Header'
      }

      await fetch('http://example.com', {
        headers: customHeaders
      })

      expect(http.fetch, 'to have a call satisfying', [
        expectAnything,
        {
          headers: expect.it(headers => {
            expect(headers.params, 'to equal', customHeaders)
          })
        }
      ])
    })

    it('stringifies the body if present', async () => {
      const body = {some: 'value'}

      await fetch('http://example.com', {
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
      await fetch('http://example.com')
      expect(responseMock.json, 'to have a call satisfying', [])
    })

    it('returns the json and the raw response', async () => {
      const json = {some: 'value'}

      sinon.stub(responseMock, 'json').resolves(json)
      expect(await fetch('http://example.com'), 'to satisfy', {
        json,
        http: responseMock
      })
    })

    it('throws a HttpResponseUnexpectedStatusError if the response was not ok', async () => {
      let error

      responseMock.ok = false

      sinon.stub(responseMock, 'text').resolves('Raw text response')
      try {
        await fetch('http://example.com')
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
        await fetch('http://example.com')
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
        await fetch('http://example.com')
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
        await fetch('http://example.com')
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

  describe('upload()', () => {
    let uploadOptions
    let responseMock

    beforeEach(() => {
      uploadOptions = {}
      responseMock = {
        ok: true,
        json: () => {},
        text: () => {}
      }
      sandbox.stub(http, 'upload').resolves(responseMock)
    })

    it('calls http.upload() with the given upload options', async () => {
      await upload(uploadOptions)
      expect(http.upload, 'to have a call satisfying', [uploadOptions])
    })

    it('parses the JSON response', async () => {
      responseMock.json = sinon.spy()
      await upload(uploadOptions)
      expect(responseMock.json, 'to have a call satisfying', [])
    })

    it('returns the json and the raw response', async () => {
      const json = {some: 'value'}

      sinon.stub(responseMock, 'json').resolves(json)
      expect(await upload(uploadOptions), 'to satisfy', {
        json,
        http: responseMock
      })
    })

    it('throws a HttpResponseUnexpectedStatusError if the response was not ok', async () => {
      let error

      responseMock.ok = false

      sinon.stub(responseMock, 'text').resolves('Raw text response')
      try {
        await upload(uploadOptions)
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
        await upload(uploadOptions)
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
        await upload(uploadOptions)
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
        await upload(uploadOptions)
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

  describe('fetchWithRetry()', () => {
    it('fetches if now retry is required', async () => {
      sandbox.stub(http, 'fetch').resolves({
        ok: true,
        json: () => Promise.resolve('some-result')
      })
      const result = await fetchWithRetry('some-url')
      expect(result.json, 'to equal', 'some-result')
    })

    it('handles rejecting promises', () => {
      sandbox.stub(http, 'fetch').rejects(new Error())

      return expect(fetchWithRetry('some-url'), 'to be rejected')
    })

    it('handles if response is not ok', () => {
      const responseMock = {
        ok: false,
        json: () => {},
        text: () => Promise.resolve('some-error')
      }
      sandbox.stub(http, 'fetch').resolves(responseMock)

      return expect(
        fetchWithRetry('some-url'),
        'to be rejected with',
        new HttpResponseUnexpectedStatusError('2xx', responseMock, 'some-error')
      )
    })

    it('fetches if two retries are required', async () => {
      sandbox
        .stub(http, 'fetch')
        .onFirstCall()
        .resolves({
          ok: false,
          json: () => {},
          text: () => Promise.resolve('some-error')
        })
        .onSecondCall()
        .resolves({
          ok: true,
          json: () => Promise.resolve('some-result')
        })
      const result = await fetchWithRetry('some-url', undefined, 2)
      expect(result.json, 'to equal', 'some-result')
    })

    it('respects the max retry amount', async () => {
      const failingResponseMock = {
        ok: false,
        json: () => {},
        text: () => Promise.resolve('some-error')
      }

      const successfulResponseMock = {
        ok: true,
        json: () => Promise.resolve('some-result')
      }

      sandbox
        .stub(http, 'fetch')
        .onCall(0)
        .resolves(failingResponseMock)
        .onCall(1)
        .resolves(failingResponseMock)
        // This call should never happen
        .onCall(2)
        .resolves(successfulResponseMock)

      return expect(
        fetchWithRetry('some-url', undefined, 2),
        'to be rejected with',
        new HttpResponseUnexpectedStatusError('2xx', failingResponseMock, 'some-error')
      )
    })
  })
})
