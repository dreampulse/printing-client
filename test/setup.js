import 'babel-polyfill'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import 'sinon-as-promised'
import fetch from 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'

// Add store middlewares here
global.mockStore = configureStore([
  thunk,
  routerMiddleware(browserHistory)
])

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon

global.fetch = fetch
