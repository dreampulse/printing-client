// @flow

import type {Action, Location} from '../type-next'

type LocationDetectedAction = Action<'USER.LOCATION_DETECTED', Location>
type DetectLocationAction = Action<'USER.DETECT_LOCATION', void>
type UserCreatedAction = Action<'USER.CREATED', void>
export type UserAction = LocationDetectedAction | DetectLocationAction | UserCreatedAction

export const locationDetected = (location: Location): LocationDetectedAction => ({
  type: 'USER.LOCATION_DETECTED',
  payload: location
})

export const detectLocation = (): DetectLocationAction => ({
  type: 'USER.DETECT_LOCATION',
  payload: undefined
})

export const userCreated = (): UserCreatedAction => ({
  type: 'USER.CREATED',
  payload: undefined
})
