// @flow

import cloneDeep from 'lodash/cloneDeep'
import {generateMaterialIds} from '../lib/material'
import type {Action, MaterialGroup} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>

export type CoreAction = UpdateMaterialGroupsAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  // TODO: Move cloneDeep() to generateMaterialIds
  payload: generateMaterialIds(cloneDeep(materialGroups))
})
