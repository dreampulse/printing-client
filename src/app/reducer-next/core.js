// @flow

import {loop, Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'

import {listMaterials} from 'App/lib/printing-engine'
import {generateMaterialIds} from 'App/lib/material'
import type {Model, UploadingModel, MaterialGroup} from 'App/type-next'
import type {AppAction} from 'App/action-next'
import * as core from 'App/action-next/core'
import * as modal from 'App/action-next/modal'

export type CoreState = {
  models: Array<Model>,
  uploadingModels: Array<UploadingModel>,
  materialGroups: Array<MaterialGroup>
}

const initialState: CoreState = {
  models: [],
  uploadingModels: [],
  materialGroups: []
}

const loadMaterialGroups = (state, action) =>
  loop(
    state,
    Cmd.run(listMaterials, {
      successActionCreator: core.updateMaterialGroups,
      failActionCreator: (err: Error) => modal.openFatalErrorModal(err),
      args: []
    })
  )

const updateMaterialGroups = (state, action) => {
  const materialGroups = cloneDeep(action.payload)

  generateMaterialIds(materialGroups)

  return {
    ...state,
    materialGroups
  }
}

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
