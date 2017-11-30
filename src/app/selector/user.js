// @flow

import type {AppState} from 'App/type-next'

export const selectUserId = (state: AppState): string | null => state.user.userId
export const selectCurrency = (state: AppState): string => state.user.currency
