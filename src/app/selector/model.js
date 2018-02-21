// @flow
import invariant from 'invariant'
import type {AppState, ModelConfig, UploadingFile, ConfigId, BackendModel} from '../type-next'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.model.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.model.backendModels[modelConfig.modelId]
        : state.model.uploadingFiles[modelConfig.fileId]
  )

export const selectModelConfigs = (state: AppState): Array<ModelConfig> => state.model.modelConfigs

export const selectSelectedModelConfigIds = (state: AppState): Array<ConfigId> =>
  state.model.selectedModelConfigs

export const selectSelectedModelConfigs = (state: AppState): Array<ModelConfig> =>
  state.model.selectedModelConfigs.map(id => {
    const item = state.model.modelConfigs.find(modelConfig => modelConfig.id === id)
    invariant(item, `ModelConfig for selectedModelConfig ${id} not found!`)
    return item
  })
