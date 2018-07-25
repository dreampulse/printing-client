import {
  isQuotePollingDone,
  selectQuotePollingProgress
} from '../../../../../src/app/lib/selector/quote'

describe('isQuotePollingDone()', () => {
  it('returns false when quote polling is not done', () => {
    const state = {
      core: {
        quotePollingId: 'some-polling-id'
      }
    }

    expect(isQuotePollingDone(state), 'to equal', false)
  })

  it('returns true when quote polling is done', () => {
    const state = {
      core: {
        quotePollingId: null
      }
    }

    expect(isQuotePollingDone(state), 'to equal', true)
  })
})

describe('selectQuotePollingProgress()', () => {
  it('returns the current progress of the polling of the quotes', () => {
    const state = {
      core: {
        printingServiceComplete: {
          'service-1': true,
          'service-2': false,
          'service-3': true
        }
      }
    }

    expect(selectQuotePollingProgress(state), 'to equal', {
      done: 2,
      total: 3
    })
  })
})
