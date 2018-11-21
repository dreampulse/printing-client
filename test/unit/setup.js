import expect from 'unexpected'
import unexpectedSinon from 'unexpected-sinon'
import sinon from 'sinon'
import noop from 'lodash/noop'

expect.use(unexpectedSinon)

global.expect = expect
global.sinon = sinon

// Needs mocks for http service
global.fetch = noop
global.Headers = Object
