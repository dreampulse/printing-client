// @flow

import type {AppState, Location} from '../type-next'

export const selectUserId = (state: AppState): string | null => state.user.userId
export const selectLocation = (state: AppState): Location | null => state.user.location
export const selectCurrency = (state: AppState): string => state.user.currency
