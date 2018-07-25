// @flow

import {loop, Cmd} from 'redux-loop'

import {getLocationByIp, isLocationValid} from '../lib/geolocation'
import {getMaterialGroups} from '../lib/printing-engine'
import type {AppAction, MaterialGroup, Location, Features} from '../type-next'
import * as coreAction from '../action-next/core'
import * as modalAction from '../action-next/modal'

export type CoreState = {
  materialGroups: Array<MaterialGroup>, // This is the material-structure-Tree
  currency: string,
  location: ?Location,
  featureFlags: Features
}

const initialState: CoreState = {
  materialGroups: [],
  currency: 'USD',
  location: null,
  featureFlags: {}
}

const init = (state, {payload: {featureFlags}}) =>
  loop(
    {
      ...state,
      featureFlags
    },
    Cmd.list([
      Cmd.run(getMaterialGroups, {
        successActionCreator: response =>
          coreAction.updateMaterialGroups(response.materialStructure),
        failActionCreator: coreAction.fatalError,
        args: []
      }),
      Cmd.run(getLocationByIp, {
        successActionCreator: coreAction.updateLocation,
        failActionCreator: modalAction.openPickLocation,
        args: []
      })
    ])
  )

const updateMaterialGroups = (state, action) => ({
  ...state,
  materialGroups: action.payload.materialGroups
})

const updateLocation = (state, action) => {
  const nextState = {
    ...state,
    location: action.payload.location
  }

  if (!isLocationValid(nextState.location)) {
    return loop(nextState, Cmd.action(modalAction.openPickLocation()))
  }

  return nextState
}

const updateCurrency = (state, action) => ({
  ...state,
  currency: action.payload.currency
})

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'CORE.INIT':
      return init(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    case 'CORE.UPDATE_LOCATION':
      return updateLocation(state, action)
    case 'CORE.UPDATE_CURRENCY':
      return updateCurrency(state, action)
    default:
      return state
  }
}

export default reducer
