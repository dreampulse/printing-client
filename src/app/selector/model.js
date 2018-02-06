// @flow

import type {AppState, ModelConfig, UploadingFile, BackendModel} from '../type-next'

// export const selectModels = (state: AppState): Array<Model> =>
//   Object.keys(state.model.models).map(id => state.model.models[id])

// export const selectUploadingFiles = (state: AppState): Array<UploadingFile> =>
//   Object.keys(state.model.uploadingFiles).map(id => state.model.uploadingFiles[id])

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.model.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.model.backendModels[modelConfig.id]
        : state.model.uploadingFiles[modelConfig.id]
  )

export const selectModelConfigs = (state: AppState): Array<ModelConfig> => state.model.modelConfigs
