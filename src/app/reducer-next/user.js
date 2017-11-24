// @flow
import {loop, Cmd} from 'redux-loop'
import type {UserState} from '../type-next'
import type {Actions} from '../action-next'

import {USER, INIT} from '../action-type-next'
import {getLocationByIp} from '../lib/geolocation'

import * as modal from '../action-next/modal'
import * as user from '../action-next/user'

const initialState = {
  userId: null,
  shippingAddress: null,
  currency: 'USD'
}

const detectLocation = (state, action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: user.changeLocation,
      failActionCreator: modal.openAddress,
      args: []
    })
  )

const changeLocation = (state, action) => ({
  ...state,
  shippingAddress: {
    ...state.shippingAddress,
    ...action.payload
  }
})

export const reducer = (state: UserState = initialState, action: Actions): UserState => {
  switch (action.type) {
    case INIT.INIT:
    case USER.DETECT_LOCATION: // not necessary now, but possible
      return detectLocation(state, action)
    case USER.CHANGE_LOCATION:
      return changeLocation(state, action)
    default:
      return state
  }
}

export default reducer
