// @flow
import type {State} from 'App/type-next'

export const selectUserId = (state: State) => state.user.userId
export const selectCurrency = (state: State) => state.user.currency
