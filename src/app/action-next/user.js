// @flow

import type {Action, Location} from '../type-next'

type LocationDetectedAction = Action<'USER.LOCATION_DETECTED', {location: Location}>
type DetectLocationAction = Action<'USER.DETECT_LOCATION', void>
type UserCreatedAction = Action<'USER.CREATED', {userId: string}>
export type UserAction = LocationDetectedAction | DetectLocationAction | UserCreatedAction

export const locationDetected = (location: Location): LocationDetectedAction => ({
  type: 'USER.LOCATION_DETECTED',
  payload: {
    location
  }
})

export const detectLocation = (): DetectLocationAction => ({
  type: 'USER.DETECT_LOCATION',
  payload: undefined
})

export const userCreated = (userId: string): UserCreatedAction => ({
  type: 'USER.CREATED',
  payload: {
    userId
  }
})
