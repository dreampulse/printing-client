import $request from '../../../../../../src/app/lib/api/http/request'

describe('http request', () => {
  let fetch
  let settings
  let response200
  let response404
  let request
  let store
  let state
  let parser
  let parseJson

  beforeEach(() => {
    settings = {
      API_BASEURL: 'http://localhost'
    }

    state = {
      auth: {
        authenticationToken: 'some_token'
      }
    }

    parser = (response) => {
      return response.text()
    }
    parseJson = (response) => {
      return response.json()
    }

    store = {
      dispatch: sinon.spy(),
      getState: sinon.stub().returns(state)
    }

    response200 = {
      status: 200,
      ok: true,
      statusText: 'OK',
      json: sinon.stub().resolves({some_json: 'response'}),
      text: sinon.stub().resolves('__SOME_TEXT_RESPONSE__')
    }

    response404 = {
      status: 404,
      ok: false,
      statusText: 'NOT FOUND',
      json: sinon.stub().resolves({some: 'response'})
    }

    fetch = sinon.stub()

    request = $request({fetch, store}, settings)
  })

  describe('request()', () => {
    let method

    beforeEach(() => {
      method = 'post'
    })

    describe('when request is successful:', () => {
      let path
      let body
      let query

      beforeEach(() => {
        path = '/example'
        body = {foo: 'body'}
        query = {foo: 'query'}
        fetch.resolves(response200)
      })

      it('calls fetch() with correctly created URL and options', () => {
        return request(method, path, null, null, parser).then(() => {
          const options = {
            method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token some_token'
            },
            credentials: 'same-origin'
          }

          expect(fetch, 'to have calls satisfying', [{
            args: ['http://localhost/example', options]
          }])
        })
      })

      it('calls fetch() without Authorization header', () => {
        state.auth.authenticationToken = null
        return request(method, path, null, null, parser).then(() => {
          const options = {
            method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
          }

          expect(fetch, 'to have calls satisfying', [{
            args: ['http://localhost/example', options]
          }])
        })
      })

      it('calls fetch() with correctly created URL and options when body and query are given', () => {
        return request(method, path, body, query, parser).then(() => {
          const options = {
            method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token some_token'
            },
            body: JSON.stringify(body),
            credentials: 'same-origin'
          }
          expect(fetch, 'to have calls satisfying', [{
            args: ['http://localhost/example?foo=query', options]
          }])
        })
      })

      it('calls fetch() with decamelized body object', () => {
        body = {
          someKey: 'some_value'
        }
        return request(method, path, body, null, parser).then(() => {
          const options = {
            method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token some_token'
            },
            body: JSON.stringify({
              some_key: 'some_value'
            }),
            credentials: 'same-origin'
          }
          expect(fetch, 'to have calls satisfying', [{
            args: ['http://localhost/example', options]
          }])
        })
      })

      it('resolves promise with response', () => {
        return request(method, path, body, query, parser).then((response) => {
          expect(response, 'to equal', '__SOME_TEXT_RESPONSE__')
        })
      })
    })

    describe('when fetch rejects promise:', () => {
      let error
      let path
      let body
      let query
      let promise

      beforeEach(() => {
        error = new Error('foo')
        path = '/example'
        body = {foo: 'body'}
        query = {foo: 'query'}
        fetch.rejects(error)
        promise = request(method, path, body, query, parser)
      })

      it('does not call then', () => {
        return promise.then(() => {
          throw new Error('Then should not be called.')
        }, () => {})
      })

      it('throws error', () => {
        let thrownError
        return promise.catch((e) => {
          thrownError = e
        })
        .then(() => {
          expect(thrownError, 'to be', error)
        })
      })
    })

    describe('when fetch returns failure status:', () => {
      let path
      let body
      let query
      let promise

      beforeEach(() => {
        path = '/example'
        body = {foo: 'body'}
        query = {foo: 'query'}
        fetch.resolves(response404)
        promise = request(method, path, body, query, parseJson)
      })

      it('does not call then', () => {
        return promise.then(() => {
          throw new Error('Then should not be called.')
        }, () => {})
      })

      it('throws http error when configured', () => {
        let thrownError
        return promise.catch((error) => {
          thrownError = error
        })
        .then(() => {
          expect(thrownError, 'to be an', 'Error')
        })
      })

      it('throws http error with expected data', () => {
        let thrownError
        return promise.catch((error) => {
          thrownError = error
        })
        .then(() => {
          expect(thrownError, 'to satisfy', {
            name: 'HttpError404',
            message: 'NOT FOUND',
            status: 404,
            response: response404
          })
        })
      })
    })
  })
})
