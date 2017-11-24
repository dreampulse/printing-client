// @flow
import {loop, Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'

import * as printingEngine from 'Lib/printing-engine'
import {generateMaterialIds} from 'Lib/material'
import type {CoreState} from '../type-next'
import * as init from '../action-next/init'
import * as core from '../action-next/core'
import * as modal from '../action-next/modal'

// eslint-disable-next-line no-unused-vars
type _ExtractReturn<B, F: (...args: any[]) => B> = B
type ExtractReturn<F> = _ExtractReturn<*, F>

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

export type CoreAction =
  | ExtractReturn<typeof init.init>
  | ExtractReturn<typeof core.updateMaterialGroups>

export const reducer = (state: CoreState = initialState, action: CoreAction): CoreState => {
  switch (action.type) {
    case init.TYPE.INIT:
      return loadMaterialGroups(state, action)
    case core.TYPE.UPDATE_MATERIAL_GROUPS:
      return updateMaterialGroups(state, action)
    default:
      return state
  }
}

export default reducer
