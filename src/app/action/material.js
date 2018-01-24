// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'

import * as printingEngine from '../service/printing-engine'

import TYPE from '../action-type'
import type {MaterialGroup} from '../type-next'

// Sync actions

export const selectMaterial = createAction(
  TYPE.MATERIAL.SELECTED,
  (materialId: string) => materialId
)

export const selectMaterialGroup = createAction(
  TYPE.MATERIAL.GROUP_SELECTED,
  (groupId: string) => groupId
)

export const selectMaterialConfigForFinishGroup = createAction(
  TYPE.MATERIAL.CONFIG_FOR_FINISH_GROUP_SELECTED,
  ({
    materialConfigId,
    finishGroupId
  }: {
    // @TODO: improve interface
    materialConfigId: string,
    finishGroupId: string
  }) => ({
    [finishGroupId]: materialConfigId
  })
)

export const selectMaterialConfig = createAction(
  TYPE.MATERIAL.CONFIG_SELECTED,
  (materialConfigId: string) => materialConfigId
)

const materialReceived = createAction(
  TYPE.MATERIAL.RECEIVED,
  (materialGroups: Array<MaterialGroup>) => materialGroups
)

// Async actions

export const getMaterials = () => async (dispatch: Dispatch<*>) => {
  const materialResponse = await printingEngine.listMaterials()
  return dispatch(materialReceived(materialResponse.materialStructure))
}
