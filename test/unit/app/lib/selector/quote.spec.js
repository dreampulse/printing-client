import {
  isQuotePollingDone,
  selectQuotePollingProgress
} from '../../../../../src/app/lib/selector/quote'

describe('isQuotePollingDone()', () => {
  it('returns whether quotes polling is done', () => {
    const state = {
      quote: {
        pollingId: 'some-polling-id'
      }
    }

    expect(isQuotePollingDone(state), 'to equal', false)
  })
})

describe('selectQuotePollingProgress()', () => {
  it('returns the current progress of the polling of the quotes', () => {
    const state = {
      quote: {
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
