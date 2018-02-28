// @flow
import type {AppState, ConfigId} from '../type-next'

export const selectChosenMaterialConfigIds = (state: AppState): Array<ConfigId> =>
  state.material.configIds
