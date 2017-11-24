// @flow
import {loop, Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'

import * as printingEngine from 'Lib/printing-engine'
import {generateMaterialIds} from 'Lib/material'
import type {CoreState} from '../type-next'
import type {Actions} from '../action-next'
import {INIT, CORE} from '../action-type-next'
import * as core from '../action-next/core'
import * as modal from '../action-next/modal'

const initialState = {
  models: [],
  uploadingModels: [],
  materialGroups: []
}

const loadMaterialGroups = (state, action) =>
  loop(
    state,
    Cmd.run(printingEngine.listMaterials, {
      successActionCreator: core.updateMaterialGroups,
      failActionCreator: () => modal.openFatalError('LOAD_MATERIAL_GROUPS_FAILED'),
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

export const reducer = (state: CoreState = initialState, action: Actions): CoreState => {
  switch (action.type) {
    case INIT.INIT:
      // case CORE.LOAD_MATERIAL_GROUPS:
      return loadMaterialGroups(state, action)
    case CORE.UPDATE_MATERIAL_GROUPS:
      return updateMaterialGroups(state, action)
    default:
      return state
  }
}

export default reducer
