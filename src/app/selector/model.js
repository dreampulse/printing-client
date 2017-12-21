// @flow

import type {AppState, Model, UploadingFile} from '../type-next'

export const selectModels = (state: AppState): Array<Model> =>
  Object.keys(state.model.models).map(id => state.model.models[id])

export const selectUploadingFiles = (state: AppState): Array<UploadingFile> =>
  Object.keys(state.model.uploadingFiles).map(id => state.model.uploadingFiles[id])

export const selectBasketItems = (state: AppState) =>
  state.model.basketItems.map((item, index) => ({
    ...item,
    id: index, // TODO: refactor BasketItem to have explicit id
    model: state.model.models[item.modelId]
  }))
