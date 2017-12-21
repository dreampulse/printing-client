// @flow

import {loop, Cmd} from 'redux-loop'
import type {AppAction, Location} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import {createUser} from '../lib/printing-engine'
import * as userAction from '../action-next/user'
import * as modal from '../action-next/modal'
import * as core from '../action-next/core'

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

const detectLocation = (state, action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: userAction.locationDetected,
      failActionCreator: modal.openPickLocationModal,
      args: []
    })
  )

const locationDetected = (state, {payload}) =>
  loop(
    {
      ...state,
      location: payload.location
    },
    Cmd.run(createUser, {
      successActionCreator: user => userAction.userCreated(user.userId),
      failActionCreator: () => core.fatalError('Failed to create the user'),
      args: [state.currency, payload.location]
    })
  )

const created = (state, {payload}) =>
  loop(
    {
      ...state,
      userId: payload.userId
    },
    Cmd.run(userLib.userCreated, {
      args: [state.userId]
    })
  )

export const reducer = (state: UserState = initialState, action: AppAction): UserState => {
  switch (action.type) {
    case 'INIT.INIT':
      return detectLocation(state, action)
    case 'USER.LOCATION_DETECTED':
      return locationDetected(state, action)
    case 'USER.CREATED':
      return created(state, action)
    default:
      return state
  }
}

export default reducer
