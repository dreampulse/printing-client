// @flow

import type {AppState, MaterialGroup, Model} from 'App/type-next'

export const selectMaterialGroups = (state: AppState): Array<MaterialGroup> =>
  state.core.materialGroups
export const selectModels = (state: AppState): Array<Model> =>
  Object.keys(state.core.models).map(id => state.core.models[id])
export const selectUploadingFiles = (state: AppState): Array<UploadingFile> =>
  Object.keys(state.core.uploadingFiles).map(id => state.core.uploadingFiles[id])
export const selectBasketItems = (state: AppState) =>
  state.core.basket.items.map(
    item =>
      item.pending
        ? {
            id: item.id,
            pending: true,
            file: state.core.uploadingFiles[item.fileId]
          }
        : {
            id: item.id,
            pending: false,
            quantity: item.quantity,
            material: item.material,
            model: state.core.models[item.modelId]
          }
  )
