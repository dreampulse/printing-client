// @flow

import type {Action, Location, ModelId} from '../type-next'

type LocationUpdatedAction = Action<'USER.LOCATION_UPDATED', {location: Location}>
type CurrencyUpdatedAction = Action<'USER.CURRENCY_UPDATED', {currency: string}>
type DetectLocationAction = Action<'USER.DETECT_LOCATION', void>
type UserCreatedAction = Action<'USER.CREATED', {userId: ModelId}>
export type UserAction =
  | LocationUpdatedAction
  | CurrencyUpdatedAction
  | DetectLocationAction
  | UserCreatedAction

export const locationUpdated = (location: Location): LocationUpdatedAction => ({
  type: 'USER.LOCATION_UPDATED',
  payload: {
    location
  }
})

/*
// Not needed right now
// But it is already tested (because its used by the init()-action)
export const detectLocation = (): DetectLocationAction => ({
  type: 'USER.DETECT_LOCATION',
  payload: undefined
})
*/

export const userCreated = (userId: ModelId): UserCreatedAction => ({
  type: 'USER.CREATED',
  payload: {
    userId
  }
})

export const currencyUpdated = (currency: string): CurrencyUpdatedAction => ({
  type: 'USER.CURRENCY_UPDATED',
  payload: {
    currency
  }
})
