// @flow

import type {Action, Location} from '../type-next'

type UpdateLocationAction = Action<'USER.UPDATE_LOCATION', Location>
type DetectLocationAction = Action<'USER.DETECT_LOCATION', void>
export type UserAction = UpdateLocationAction | DetectLocationAction

export const updateLocation = (location: Location): UpdateLocationAction => ({
  type: 'USER.UPDATE_LOCATION',
  payload: location
})

export const detectLocation = (): DetectLocationAction => ({
  type: 'USER.DETECT_LOCATION',
  payload: undefined
})
