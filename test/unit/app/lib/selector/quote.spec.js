import {
  isQuotePollingDone,
  selectQuotePollingProgress,
  selectQuotes,
  selectUsedShippingIds
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
      complete: 2,
      total: 3
    })
  })

  it('returns complete 1 if only one service is completed', () => {
    const state = {
      core: {
        printingServiceComplete: {
          'service-1': true,
          'service-2': false,
          'service-3': false
        }
      }
    }

    expect(selectQuotePollingProgress(state), 'to equal', {
      complete: 1,
      total: 3
    })
  })
})

describe('selectQuotes()', () => {
  it('returns the quotes', () => {
    const state = {
      core: {
        quotes: {
          'some-id-1': 'some-quote-1',
          'some-id-2': 'some-quote-2'
        }
      }
    }

    expect(selectQuotes(state), 'to equal', ['some-quote-1', 'some-quote-2'])
  })
})

describe('selectUsedShippingIds()', () => {
  it('returns all shipping ids', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-2'
          }
        ]
      }
    }

    expect(selectUsedShippingIds(state), 'to equal', ['shipping-1', 'shipping-2'])
  })

  it('removes empty values from return list', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: null
          },
          {
            id: 'config-3',
            type: 'UPLOADING',
            shippingId: null
          }
        ]
      }
    }

    expect(selectUsedShippingIds(state), 'to equal', ['shipping-1'])
  })

  it('removes duplicates from return list', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          }
        ]
      }
    }

    expect(selectUsedShippingIds(state), 'to equal', ['shipping-1'])
  })

  it('excludes given model config ids', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-2'
          }
        ]
      }
    }

    expect(selectUsedShippingIds(state, ['config-2']), 'to equal', ['shipping-1'])
  })
})
