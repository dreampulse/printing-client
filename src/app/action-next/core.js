// @flow

import type {Action, MaterialGroup} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
export type CoreAction = UpdateMaterialGroupsAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: materialGroups
})
