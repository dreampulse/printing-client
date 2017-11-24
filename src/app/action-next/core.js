// @flow
import type {MaterialGroup} from '../type-next'

export const TYPE = {
  UPDATE_MATERIAL_GROUPS: 'CORE.UPDATE_MATERIAL_GROUPS'
}

export const updateMaterialGroups = (materialGroups: Array<MaterialGroup>) => ({
  type: TYPE.UPDATE_MATERIAL_GROUPS,
  payload: materialGroups
})
