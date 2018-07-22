// @flow

import flatMap from 'lodash/fp/flatMap'
import compose from 'lodash/fp/compose'
import type {AppState, MaterialGroup, MaterialConfigId} from '../type-next'

export const selectMaterialGroups = (state: AppState): Array<MaterialGroup> =>
  state.core.materialGroups

export const selectAllMaterialConfigIds: (state: AppState) => Array<MaterialConfigId> = compose(
  flatMap(materialConfig => materialConfig.id),
  flatMap(finishGroup => finishGroup.materialConfigs),
  flatMap(material => material.finishGroups),
  flatMap(materialGroup => materialGroup.materials),
  state => state.core.materialGroups
)

export const selectFeatureFlags = (state: AppState) => state.core.featureFlags
