// @flow

import type {Dispatch} from 'redux'
import cloneDeep from 'lodash/cloneDeep'
import {createAction} from 'redux-actions'

import * as printingEngine from 'Lib/printing-engine'
import {
  generateMaterialIds
} from 'Lib/material'

import type {Materials} from '../type'
import TYPE from '../action-type'

// Sync actions
export const selectMaterial = createAction(
  TYPE.MATERIAL.SELECTED,
  (materialId : string) => materialId
)
export const selectMaterialConfigForFinishGroup = createAction(
  TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED,
  ({materialConfigId, finishGroupId} : {  // @TODO: improve interface
    materialConfigId: string, finishGroupId: string
  }) => ({
    [finishGroupId]: materialConfigId
  })
)
export const selectMaterialConfig = createAction(
  TYPE.MATERIAL.CONFIG_SELECTED,
  (materialConfigId : string) => materialConfigId
)
const materialReceived = createAction(
  TYPE.MATERIAL.RECEIVED,
  (materials : Materials) => materials
)

// Async actions
export const getMaterials = () => async (
  dispatch : Dispatch<*>
) => {
  const materials = cloneDeep(await printingEngine.listMaterials())
  generateMaterialIds(materials)

  return dispatch(materialReceived(materials))
}
