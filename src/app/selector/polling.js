// @flow

import type {AppState, PollingId} from '../type-next'

export const isPollingActive = (state: AppState, pollingId: PollingId): boolean =>
  pollingId in state.polling.activePollings
