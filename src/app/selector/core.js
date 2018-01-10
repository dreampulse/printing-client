// @flow

import type {AppState, MaterialGroup} from '../type-next'

export const selectMaterialGroups = (state: AppState): Array<MaterialGroup> =>
  state.core.materialGroups
