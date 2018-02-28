import 'babel-polyfill'
import 'source-map-support/register'
import {Cmd, getModel, getCmd} from 'redux-loop'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import fetch from 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {findCmd, findAction, createLegacyStore} from './helper'

// Necessary because sinon does not wrap functions that do not exist
// redux-loop sets Cmd.dispatch only if used with a real store
Cmd.dispatch = () => {}

expect.use(unexpectedSinon)

// mockStore is used in legacy unit tests
// Do not use it in new tests with redux-loop
global.mockStore = configureStore([thunk])
// createLegacyStore is used in legacy integration tests
// Do not use it in new tests with redux-loop
global.createLegacyStore = createLegacyStore
global.expect = expect
global.sinon = sinon
global.fetch = fetch
global.getModel = getModel
global.getCmd = getCmd
global.findCmd = findCmd
global.findAction = findAction
