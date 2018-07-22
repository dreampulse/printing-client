// @flow

import filter from 'lodash/filter'
import sum from 'lodash/sum'
import type {AppState} from '../type-next'

export const selectIsPollingDone = (state: AppState) => !state.quote.pollingId

export const selectPollingProgress = (state: AppState) => ({
  done: Object.keys(state.quote.printingServiceComplete).length,
  total: sum(filter(state.quote.printingServiceComplete))
})
