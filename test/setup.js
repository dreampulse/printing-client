import 'babel-polyfill'
import 'source-map-support/register'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import fetch from 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {testDispatch, reduceState} from './helper'

expect.use(unexpectedSinon)

// Add store middlewares here
global.mockStore = configureStore([thunk])
global.expect = expect
global.sinon = sinon
global.fetch = fetch
global.testDispatch = testDispatch
global.reduceState = reduceState
