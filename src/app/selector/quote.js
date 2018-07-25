// @flow

import filter from 'lodash/filter'
import sum from 'lodash/sum'
import type {AppState} from '../type-next'

export const isQuotePollingDone = (state: AppState) => !state.quote.pollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  done: sum(filter(state.quote.printingServiceComplete)),
  total: Object.keys(state.quote.printingServiceComplete).length
})
