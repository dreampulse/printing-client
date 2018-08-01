// @flow

import sum from 'lodash/sum'
import type {AppState} from '../../type-next'

export const isQuotePollingDone = (state: AppState) => !state.core.quotePollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  complete: sum(Object.values(state.core.printingServiceComplete)),
  total: Object.keys(state.core.printingServiceComplete).length
})

export const selectQuotes = (state: AppState) => Object.values(state.core.quotes)
