// @flow
import invariant from 'invariant'
import type {AppState, ModelConfig, UploadingFile, ConfigId, BackendModel} from '../../type-next'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.model.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.model.backendModels[modelConfig.modelId]
        : state.model.uploadingFiles[modelConfig.fileId]
  )

export const selectCartCount = (state: AppState) =>
  state.model.modelConfigs.filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  ).length

export const selectSelectedModelConfigIds = (state: AppState): Array<ConfigId> =>
  state.model.selectedModelConfigs

export const selectSelectedModelConfigs = (state: AppState): Array<ModelConfig> =>
  state.model.selectedModelConfigs.map(id => {
    const item = state.model.modelConfigs.find(modelConfig => modelConfig.id === id)
    invariant(item, `ModelConfig for selectedModelConfig ${id} not found!`)
    return item
  })

export const selectModelConfigsByIds = (state: AppState, configIds: Array<ConfigId>) =>
  state.model.modelConfigs.filter(modelConfig => configIds.includes(modelConfig.id))
