// @flow

import {loop, Cmd} from 'redux-loop'
import {listMaterials} from '../service/printing-engine'
import type {MaterialGroup} from '../type-next'
import type {AppAction} from '../action-next'
import * as core from '../action-next/core'
import * as modal from '../action-next/modal'

export type CoreState = {
  materialGroups: Array<MaterialGroup> // This is the material-structure-Tree
}

const initialState: CoreState = {
  materialGroups: []
}

const loadMaterialGroups = (state, action) =>
  loop(
    state,
    Cmd.run(listMaterials, {
      args: [],
      successActionCreator: res => core.updateMaterialGroups(res.materialStructure),
      failActionCreator: modal.openFatalErrorModal
    })
  )

const updateMaterialGroups = (state, action) => ({
  ...state,
  materialGroups: action.payload
})

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'INIT.INIT':
      return loadMaterialGroups(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    default:
      return state
  }
}

export default reducer
