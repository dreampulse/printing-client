// @flow

import sum from 'lodash/sum'
import uniq from 'lodash/uniq'
import compact from 'lodash/compact'

import type {AppState, ConfigId} from '../../type-next'

export const isQuotePollingDone = (state: AppState) => !state.core.quotePollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  complete: sum(Object.values(state.core.printingServiceComplete)),
  total: Object.keys(state.core.printingServiceComplete).length
})

export const selectQuotes = (state: AppState) => Object.values(state.core.quotes)

export const selectUsedShippingIds = (state: AppState, excludeConfigIds: Array<ConfigId> = []) =>
  uniq(
    compact(
      state.core.modelConfigs.map(
        modelConfig =>
          modelConfig.type === 'UPLOADED' &&
          !excludeConfigIds.find(id => modelConfig.type === 'UPLOADED' && id === modelConfig.id)
            ? modelConfig.shippingId
            : null
      )
    )
  )
