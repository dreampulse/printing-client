// @flow
import type {Location} from '../type-next'

export const TYPE = {
  CHANGE_LOCATION: 'USER.CHANGE_LOCATION',
  DETECT_LOCATION: 'USER.DETECT_LOCATION'
}

export const changeLocation = (location: Location) => ({
  type: TYPE.CHANGE_LOCATION,
  payload: location
})

export const detectLocation = () => ({
  type: TYPE.DETECT_LOCATION
})
