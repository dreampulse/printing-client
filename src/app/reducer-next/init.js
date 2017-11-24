// @flow
import {loop, Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'
import type {InitState} from '../type-next'
import type {Actions} from '../action-next'

import {INIT, USER} from '../action-type-next'

import * as user from '../action-next/user'
import * as modal from '../action-next/modal'

import {getLocationByIp} from '../lib/geolocation'

const initialState = {
  isLoading: true
}

const init = (state, action) =>
  loop(
    state,
    Cmd.run(getLocationByIp, {
      successActionCreator: user.updateLocation,
      failActionCreator: modal.openAddress,
      args: []
    })
  )

const gotLocation = (state, action) => ({
  isLoading: false
})

export const reducer = (state: InitState = initialState, action: Actions) => {
  switch (action.type) {
    case INIT.INIT:
      return init(state, action)
    case USER.UPDATE_LOCATION:
      return gotLocation(state, action)
    default:
      return state
  }
}

export default reducer
