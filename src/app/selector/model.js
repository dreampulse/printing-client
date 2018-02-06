// @flow

import type {AppState, Model, UploadingFile} from '../type-next'

export const selectModels = (state: AppState): Array<Model> =>
  Object.keys(state.model.models).map(id => state.model.models[id])

export const selectUploadingFiles = (state: AppState): Array<UploadingFile> =>
  Object.keys(state.model.uploadingFiles).map(id => state.model.uploadingFiles[id])

export const selectModelConfigs = (state: AppState): Array<ModelConfig> => state.model.modelConfigs

export const selectSelectedModelConfigIds = (state: AppState): Array<ConfigId> =>
  state.model.selectedModelConfigs

export const selectSelectedModelConfigs = (state: AppState): Array<ModelConfig> =>
  state.model.selectedModelConfigs.map(id =>
    state.model.modelConfigs.find(modelConfig => modelConfig.id === id)
  )

export const selectCommonQuantity = (state: AppState): ?number => {
  // Common quantity exists only if all selected model configs have the same individual quantity
  const selectedModelConfigs = selectSelectedModelConfigs(state)

  if (selectedModelConfigs.length === 0) {
    return null
  }

  return selectedModelConfigs.reduce((quantity, modelConfig) => {
    if (quantity === undefined) {
      return modelConfig.quantity
    }
    if (quantity === modelConfig.quantity) {
      return quantity
    }
    return null
  }, undefined)
}
