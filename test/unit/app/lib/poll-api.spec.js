import pollApi from 'Lib/poll-api'
import config from '../../../../config'

describe('poll api lib', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('resolves if the inner promise resolves', (done) => {
    const api = () => Promise.resolve(true)
    pollApi(() => api()).then(done)
  })

  it('rejects if the inner promise rejcts', (done) => {
    const api = () => Promise.reject()
    pollApi(() => api()).catch(done)
  })

  it('retries if api returns false', () => {
    sandbox.stub(config, 'pollingRetries', 10)
    sandbox.stub(config, 'pollingInvervall', 1)

    const api = sinon.stub().resolves(false)

    return pollApi(() => api()).catch(() => {
      expect(api, 'was called times', 10)
    })
  })
})
