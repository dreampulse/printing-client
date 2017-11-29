// @flow
import type {State} from 'App/type-next'

export const selectMaterialGroups = (state: State) => state.core.materialGroups
export const selectModels = (state: State) => state.core.models
export const selectUploadingModels = (state: State) => state.core.uploadingModels
