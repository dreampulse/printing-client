// @flow
import {loop, Cmd} from 'redux-loop'
import type {UserState} from '../type-next'

import {getLocationByIp} from '../lib/geolocation'

import * as init from '../action-next/init'
import * as user from '../action-next/user'
import * as modal from '../action-next/modal'

// eslint-disable-next-line no-unused-vars
type _ExtractReturn<B, F: (...args: any[]) => B> = B
type ExtractReturn<F> = _ExtractReturn<*, F>

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

export type UserAction =
  | ExtractReturn<typeof init.init>
  | ExtractReturn<typeof user.detectLocation>
  | ExtractReturn<typeof user.changeLocation>

export const reducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case init.TYPE.INIT:
    case user.TYPE.DETECT_LOCATION: // not necessary now, but possible
      return detectLocation(state, action)
    case user.TYPE.CHANGE_LOCATION:
      return changeLocation(state, action)
    default:
      return state
  }
}

export default reducer
