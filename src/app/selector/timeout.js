// @flow

import type {AppState, TimeoutId} from '../type-next'

export const isTimeoutActive = (state: AppState, timeoutId: TimeoutId): boolean =>
  timeoutId in state.timeout.activeTimeouts
