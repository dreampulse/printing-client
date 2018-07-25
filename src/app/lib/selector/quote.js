// @flow

import filter from 'lodash/filter'
import sum from 'lodash/sum'
import type {AppState} from '../../type-next'

export const isQuotePollingDone = (state: AppState) => !state.core.quotePollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  done: sum(filter(state.core.printingServiceComplete)),
  total: Object.keys(state.core.printingServiceComplete).length
})
