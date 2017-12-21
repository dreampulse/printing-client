// @flow

import type {AppState, Location} from '../type-next'

export const selectUserId = (state: AppState): ?string => state.user.userId
export const selectLocation = (state: AppState): ?Location => state.user.location
export const selectCurrency = (state: AppState): string => state.user.currency
