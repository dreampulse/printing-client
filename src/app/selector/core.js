// @flow

import type {AppState, MaterialGroup, Model, UploadingModel} from 'App/type-next'

export const selectMaterialGroups = (state: AppState): Array<MaterialGroup> =>
  state.core.materialGroups
export const selectModels = (state: AppState): Array<Model> => state.core.models
export const selectUploadingModels = (state: AppState): Array<UploadingModel> =>
  state.core.uploadingModels
