import 'babel-polyfill'
import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import 'sinon-as-promised'

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon
