// @flow

import {loop, Cmd} from 'redux-loop'
import type {AppAction, Location} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import * as userAction from '../action-next/user'
import * as modalAction from '../action-next/modal'

export type UserState = {
  userId: string | null,
  location: Location | null,
  currency: string
}

const initialState: UserState = {
  userId: null,
  location: null,
  currency: 'USD'
}

const detectLocation = (state, action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: userAction.updateLocation,
      failActionCreator: modalAction.openPickLocationModal,
      args: []
    })
  )

const updateLocation = (state, action) => ({
  ...state,
  location: action.payload
})

export const reducer = (state: UserState = initialState, action: AppAction): UserState => {
  switch (action.type) {
    case 'INIT.INIT':
      return detectLocation(state, action)
    case 'USER.UPDATE_LOCATION':
      return updateLocation(state, action)
    default:
      return state
  }
}

export default reducer
