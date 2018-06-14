// @flow

import {loop, Cmd} from 'redux-loop'
import {fetchMaterialGroups} from '../lib/printing-engine'
import type {AppAction, MaterialGroup} from '../type-next'
import * as coreAction from '../action-next/core'

export type CoreState = {
  materialGroups: Array<MaterialGroup> // This is the material-structure-Tree
}

const initialState: CoreState = {
  materialGroups: []
}

const initMaterialGroups = (state, _action) =>
  loop(
    state,
    Cmd.run(fetchMaterialGroups, {
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
    case 'INIT.INIT':
      return initMaterialGroups(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    default:
      return state
  }
}

export default reducer
