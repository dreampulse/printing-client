import 'babel-polyfill'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import 'sinon-as-promised'
import fetch from 'isomorphic-fetch'

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon

global.fetch = fetch
