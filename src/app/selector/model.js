// @flow

import type {AppState, ModelConfig, UploadingFile, BackendModel} from '../type-next'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.model.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.model.backendModels[modelConfig.modelId]
        : state.model.uploadingFiles[modelConfig.fileId]
  )

export const selectModelConfigs = (state: AppState): Array<ModelConfig> => state.model.modelConfigs
