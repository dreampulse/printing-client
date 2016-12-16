import pollApi from '../../../../src/app/lib/poll-api'
import config from '../../../../src/app/config'

describe('poll api lib', () => {
  beforeEach(() => {
    sinon.stub(config)
  })

  afterEach(() => {
    sinon.restore(config)
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
    config.pollingRetries = 10
    config.pollingInvervall = 1

    const api = sinon.stub().resolves(false)

    return pollApi(() => api()).catch(() => {
      expect(api, 'was called times', 10)
    })
  })
})
