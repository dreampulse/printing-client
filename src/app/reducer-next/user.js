// @flow

import {loop, Cmd} from 'redux-loop'
import type {AppAction, Location} from '../type-next'
import {getLocationByIp} from '../lib/geolocation'
import {createUser} from '../lib/printing-engine'
import * as user from '../action-next/user'
import * as modal from '../action-next/modal'
import * as core from '../action-next/core'

import {identify} from '../service/mixpanel'
import {setUserContext} from '../service/logging'

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
      successActionCreator: user.locationDetected,
      failActionCreator: modal.openPickLocationModal,
      args: []
    })
  )

const locationDetected = (state, action) =>
  loop(
    {
      ...state,
      location: action.payload
    },
    Cmd.run(createUser, {
      successActionCreator: user.userCreated,
      failActionCreator: () => core.fatalError('Failed to create the user'),
      args: [state.userId]
    })
  )

const created = (state, action) =>
  loop(
    state,
    Cmd.run(
      userId => {
        identify(userId) // Send user information to Mixpanel
        setUserContext({
          id: userId
        })
      },
      {
        args: [state.userId]
      }
    )
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
