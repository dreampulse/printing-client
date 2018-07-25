// @flow

import {loop, Cmd} from 'redux-loop'
import {getMaterialGroups} from '../lib/printing-engine'
import type {AppAction, MaterialGroup, Features} from '../type-next'
import * as coreAction from '../action-next/core'

export type CoreState = {
  materialGroups: Array<MaterialGroup>, // This is the material-structure-Tree
  featureFlags: Features
}

const initialState: CoreState = {
  materialGroups: [],
  featureFlags: {}
}

const init = (state, {payload: {featureFlags}}) =>
  loop(
    {
      ...state,
      featureFlags
    },
    Cmd.run(getMaterialGroups, {
      args: [],
      successActionCreator: response => coreAction.updateMaterialGroups(response.materialStructure),
      failActionCreator: coreAction.fatalError
    })
  )

const updateMaterialGroups = (state, action) => ({
  ...state,
  materialGroups: action.payload
})

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'CORE.INIT':
      return init(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    default:
      return state
  }
}

export default reducer
