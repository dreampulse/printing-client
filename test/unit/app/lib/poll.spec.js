import {
  resetPollState,
  poll,
  debouncedPoll,
  stopPoll
} from 'Lib/poll'
import {ERROR_TYPE} from '../../../../src/app/action-type'
import config from '../../../../config'

describe('Poll lib', () => {
  let sandbox

  beforeEach(() => {
    resetPollState()

    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'pollingInverval', 0)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('poll()', () => {
    it('ends polling when callback resolves with true', async () => {
      const pollCallback = sinon.stub()
        .withArgs()
        .resolves(true)

      await poll('some-poll', pollCallback)

      expect(pollCallback, 'was called times', 1)
    })

    it('retries when poll callback resolves with false the first time', async () => {
      sandbox.stub(config, 'pollingRetries', 100)

      const pollCallback = sinon.stub()
      pollCallback.withArgs().onCall(0).resolves(false)
      pollCallback.withArgs().onCall(1).resolves(true)

      await poll('some-poll', pollCallback)

      expect(pollCallback, 'was called times', 2)
    })

    it('rejects with error after retry limit is reached', async () => {
      sandbox.stub(config, 'pollingRetries', 2)
      const pollCallback = sinon.stub()
        .withArgs()
        .resolves(false)

      const promise = poll('some-poll', pollCallback)

      return expect(promise, 'to be rejected with error satisfying',
        {type: ERROR_TYPE.POLL_TIMEOUT})
    })

    it('calls pollCallback with a maximum of pollingRetries plus one', async () => {
      sandbox.stub(config, 'pollingRetries', 2)
      const pollCallback = sinon.stub()
        .withArgs()
        .resolves(false)

      return poll('some-poll', pollCallback).catch(() => {
        expect(pollCallback, 'was called times', 3)
      })
    })

    it('rejects when another poll with the same name has been started', async () => {
      const pollCallbackTrue = sinon.stub().withArgs().resolves(true)
      const pollCallbackFalse = sinon.stub().withArgs().resolves(false)

      const promise = poll('some-poll', pollCallbackFalse)
      poll('some-poll', pollCallbackTrue)

      return expect(promise, 'to be rejected with error satisfying',
        {type: ERROR_TYPE.POLL_OVERWRITTEN})
    })

    it('rejects when poll callback rejects', async () => {
      const error = new Error('some-error')
      const pollCallback = sinon.stub().withArgs().rejects(error)

      const promise = poll('some-poll', pollCallback)

      return expect(promise, 'to be rejected with error satisfying', error)
    })

    it('forwards return value of initial poll callback to poll callback', async () => {
      const response = 'some-response'
      const initPollCallback = sinon.stub().withArgs().resolves(response)
      const pollCallback = sinon.stub()
      pollCallback.withArgs(response).onCall(0).resolves(false)
      pollCallback.withArgs(response).onCall(1).resolves(true)

      await poll('some-poll', pollCallback, initPollCallback)

      expect(pollCallback, 'was called times', 2)
    })

    it('rejects when init poll callback rejects', async () => {
      const error = new Error('some-error')
      const initPollCallback = sinon.stub().withArgs().rejects(error)

      const promise = poll('some-poll', () => {}, initPollCallback)

      return expect(promise, 'to be rejected with error satisfying', error)
    })
  })

  describe('stopPoll()', () => {
    it('stop running poll which then rejects with expected error', async () => {
      const pollCallback = sinon.stub()
        .withArgs()
        .resolves(false)

      const promise = poll('some-poll', pollCallback)

      stopPoll('some-poll')

      return expect(promise, 'to be rejected with error satisfying',
        {type: ERROR_TYPE.POLL_STOPPED})
    })
  })

  describe('debouncedPoll', () => {
    it('starts poll only once if called multiple times in a row', async () => {
      sandbox.stub(config, 'pollingDebouncedWait', 1)

      const pollCallback = sinon.stub()
        .withArgs()
        .resolves(true)

      await Promise.all([
        debouncedPoll('some-poll', pollCallback),
        debouncedPoll('some-poll', pollCallback)
      ])

      expect(pollCallback, 'was called times', 1)
    })
  })
})
