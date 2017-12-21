// @flow

import cloneDeep from 'lodash/cloneDeep'
import {generateMaterialIds} from '../lib/material'
import type {Action, MaterialGroup} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>

export type CoreAction = UpdateMaterialGroupsAction | FatalErrorAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  // TODO: Move cloneDeep() to generateMaterialIds
  payload: generateMaterialIds(cloneDeep(materialGroups))
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})
