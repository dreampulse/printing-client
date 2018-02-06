// @flow

import type {Action, Location, ModelId} from '../type-next'

type LocationDetectedAction = Action<'USER.LOCATION_DETECTED', {location: Location}>
type DetectLocationAction = Action<'USER.DETECT_LOCATION', void>
type UserCreatedAction = Action<'USER.CREATED', {userId: ModelId}>
export type UserAction = LocationDetectedAction | DetectLocationAction | UserCreatedAction

export const locationDetected = (location: Location): LocationDetectedAction => ({
  type: 'USER.LOCATION_DETECTED',
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
