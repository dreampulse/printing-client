// @flow

import type {Action, MaterialGroup} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
type FatalErrorAction = Action<'CORE.FATAL_ERROR', Error>

export type CoreAction = UpdateMaterialGroupsAction | FatalErrorAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: materialGroups
})

export const fatalError = (error: Error): FatalErrorAction => ({
  type: 'CORE.FATAL_ERROR',
  payload: error
})
