// @flow

import {loop, Cmd} from 'redux-loop'
import type {AppAction, Location} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import * as printingEngine from '../service/printing-engine'
import * as userAction from '../action-next/user'
import * as modalAction from '../action-next/modal'
import * as coreAction from '../action-next/core'

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
      successActionCreator: userAction.locationDetected,
      failActionCreator: modalAction.openPickLocationModal,
      args: []
    })
  )

const locationDetected = (state, {payload}) =>
  loop(
    {
      ...state,
      location: payload.location
    },
    Cmd.run(printingEngine.createUser, {
      successActionCreator: user => userAction.userCreated(user.userId),
      failActionCreator: coreAction.fatalError,
      args: [
        {
          currency: state.currency,
          location: payload.location
        }
      ]
    })
  )

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
    case 'INIT.INIT':
      // case 'USER.DETECT_LOCATION':  <- not needed right now
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
