// @flow

import filter from 'lodash/filter'
import sum from 'lodash/sum'
import type {AppState} from '../../type-next'

export const isQuotePollingDone = (state: AppState) => !state.quote.pollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  complete: sum(filter(state.quote.printingServiceComplete)),
  total: Object.keys(state.quote.printingServiceComplete).length
})

export const selectQuotes = (state: AppState) => Object.values(state.quote.quotes)
