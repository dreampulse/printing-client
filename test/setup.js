import 'babel-polyfill'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import fetch from 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// Add store middlewares here
global.mockStore = configureStore([
  thunk
])

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon

global.fetch = fetch
