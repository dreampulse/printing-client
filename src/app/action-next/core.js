// @flow
import {createAction} from 'redux-actions'
import type {MaterialGroup} from '../type-next'

import {CORE} from '../action-type-next'

export const updateMaterialGroups = createAction(
  CORE.UPDATE_MATERIAL_GROUPS,
  (materialGroups: Array<MaterialGroup>) => materialGroups
)
