// @flow

import {loop, Cmd} from 'redux-loop'
import type {AppAction, Location} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import * as userAction from '../action-next/user'
import * as modalAction from '../action-next/modal'
import * as userLib from '../lib/user'

export type UserState = {
  userId: ?string,
  location: ?Location,
  currency: string
}

const initialState: UserState = {
  userId: null,
  location: null,
  currency: 'USD'
}

const detectLocation = (state, _action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: userAction.locationUpdated,
      failActionCreator: modalAction.openPickLocation,
      args: []
    })
  )

const locationUpdated = (state, {payload}) => ({
  ...state,
  location: payload.location
})

const currencyUpdated = (state, {payload}) => ({
  ...state,
  currency: payload.currency
})

const created = (state, {payload}) =>
  loop(
    {
      ...state,
      userId: payload.userId
    },
    Cmd.run(userLib.userCreated, {
      args: [payload.userId]
    })
  )

export const reducer = (state: UserState = initialState, action: AppAction): UserState => {
  switch (action.type) {
    case 'CORE.INIT':
      // case 'USER.DETECT_LOCATION':  <- not needed right now
      return detectLocation(state, action)
    case 'USER.LOCATION_UPDATED':
      return locationUpdated(state, action)
    case 'USER.CURRENCY_UPDATED':
      return currencyUpdated(state, action)
    case 'USER.CREATED':
      return created(state, action)
    default:
      return state
  }
}

export default reducer
