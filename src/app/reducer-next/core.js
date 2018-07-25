// @flow

import {loop, Cmd} from 'redux-loop'

import {getLocationByIp} from '../lib/geolocation'
import {getMaterialGroups} from '../lib/printing-engine'
import type {AppAction, MaterialGroup} from '../type-next'
import * as coreAction from '../action-next/core'
import * as modalAction from '../action-next/modal'

export type CoreState = {
  materialGroups: Array<MaterialGroup> // This is the material-structure-Tree
}

const initialState: CoreState = {
  materialGroups: [],
  currency: 'USD',
  location: null
}

const init = (state, _action) =>
  loop(
    state,
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

const updateLocation = (state, action) => ({
  ...state,
  location: action.payload.location
})

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
