import 'babel-polyfill'
import 'source-map-support/register'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import fetch from 'isomorphic-fetch'

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon
global.fetch = fetch
