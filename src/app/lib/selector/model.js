// @flow
import invariant from 'invariant'
import type {AppState, ModelConfig, UploadingFile, ConfigId, BackendModel} from '../../type-next'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.core.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.core.backendModels[modelConfig.modelId]
        : state.core.uploadingFiles[modelConfig.fileId]
  )

export const selectCartCount = (state: AppState) =>
  state.core.modelConfigs.filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  ).length

export const selectSelectedModelConfigs = (state: AppState): Array<ModelConfig> =>
  state.core.selectedModelConfigs.map(id => {
    const item = state.core.modelConfigs.find(modelConfig => modelConfig.id === id)
    invariant(item, `ModelConfig for selectedModelConfig ${id} not found!`)
    return item
  })

export const selectModelConfigsByIds = (state: AppState, configIds: Array<ConfigId>) =>
  state.core.modelConfigs.filter(modelConfig => configIds.includes(modelConfig.id))
