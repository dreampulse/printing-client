// @flow

import {loop, Cmd} from 'redux-loop'
import type {UserState, AppAction} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import * as user from '../action-next/user'
import * as modal from '../action-next/modal'

const initialState: UserState = {
  userId: null,
  location: null,
  currency: 'USD'
}

const detectLocation = (state, action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: user.updateLocation,
      failActionCreator: modal.openPickLocationModal,
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
