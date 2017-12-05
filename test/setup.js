import 'babel-polyfill'
import 'source-map-support/register'
import {Cmd} from 'redux-loop'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import fetch from 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {testDispatch, reduceState} from './helper'

// Necessary because sinon does not wrap functions that do not exist
// redux-loop sets Cmd.dispatch only if used with a real store
Cmd.dispatch = () => {}

expect.use(unexpectedSinon)

// Add store middlewares here
global.mockStore = configureStore([thunk])
global.expect = expect
global.sinon = sinon
global.fetch = fetch
global.testDispatch = testDispatch
global.reduceState = reduceState
