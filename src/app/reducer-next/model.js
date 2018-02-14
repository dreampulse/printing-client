// @flow

import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import {uploadModel} from '../service/printing-engine'
import type {
  BackendModel,
  UploadingFile,
  BackendQuote,
  QuoteId,
  ModelId,
  ConfigId,
  FileId,
  ModelConfig
} from '../type-next'
import type {AppAction} from '../action-next'
import * as modelAction from '../action-next/model'

export type ModelState = {
  uploadingFiles: {[id: FileId]: UploadingFile},
  backendModels: {[id: ModelId]: BackendModel},
  quotes: {[id: QuoteId]: BackendQuote},
  modelConfigs: Array<ModelConfig>,
  selectedModelConfigs: Array<ConfigId>
}

const initialState: ModelState = {
  uploadingFiles: {},
  backendModels: {},
  quotes: {},
  modelConfigs: [],
  selectedModelConfigs: []
}

const uploadFile = (state, {payload}) => {
  const fileId = payload.fileId

  const file = {
    fileId,
    fileName: payload.file.name,
    fileSize: payload.file.size,
    progress: 0,
    error: false
  }

  return loop(
    {
      ...state,
      uploadingFiles: {
        ...state.uploadingFiles,
        [fileId]: file
      },
      modelConfigs: [
        ...state.modelConfigs,
        {
          type: 'UPLOADING',
          fileId,
          id: payload.configId
        }
      ]
    },
    Cmd.run(uploadModel, {
      args: [
        payload.file,
        {unit: 'mm'},
        progress => Cmd.dispatch(modelAction.uploadProgress(fileId, progress))
      ],
      successActionCreator: model => modelAction.uploadComplete(fileId, model),
      failActionCreator: error => modelAction.uploadFail(fileId, error)
    })
  )
}

const uploadProgress = (state, {payload}) => {
  const fileId = payload.fileId

  invariant(state.uploadingFiles[fileId], `Error in uploadProgress(): File ${fileId} is unknown`)

  return loop(
    {
      ...state,
      uploadingFiles: {
        ...state.uploadingFiles,
        [fileId]: {
          ...state.uploadingFiles[fileId],
          progress: payload.progress
        }
      }
    },
    Cmd.run(uploadModel, {
      args: [
        payload,
        {unit: 'mm'},
        progress => Cmd.dispatch(modelAction.uploadProgress(fileId, progress))
      ],
      successActionCreator: model => modelAction.uploadComplete(fileId, model),
      failActionCreator: error => modelAction.uploadFail(fileId, error)
    })
  )
}

const uploadComplete = (state, {payload}) => {
  const fileId = payload.fileId
  const model = payload.model

  invariant(state.uploadingFiles[fileId], `Error in uploadComplete(): File ${fileId} is unknown`)

  return {
    ...state,
    backendModels: {
      ...state.backendModels,
      [model.modelId]: model
    },
    modelConfigs: state.modelConfigs.map(
      modelConfig =>
        modelConfig.type === 'UPLOADING' && modelConfig.fileId === fileId
          ? {
              type: 'UPLOADED',
              quantity: 1,
              modelId: model.modelId,
              id: modelConfig.id,
              quoteId: null,
              shippingId: null
            }
          : modelConfig
    )
  }
}

const uploadFail = (state, {payload}) => {
  const fileId = payload.fileId

  invariant(state.uploadingFiles[fileId], `Error in uploadFail(): File ${fileId} is unknown`)

  return {
    ...state,
    uploadingFiles: {
      ...state.uploadingFiles,
      [fileId]: {
        ...state.uploadingFiles[fileId],
        error: true,
        errorMessage: payload.error.message
      }
    }
  }
}

const deleteModelConfigs = (state, {payload}) => ({
  ...state,
  modelConfigs: state.modelConfigs.filter(modelConfig => payload.ids.indexOf(modelConfig.id) === -1)
})

const updateSelectedModelConfigs = (state, {payload}) => ({
  ...state,
  selectedModelConfigs: payload.ids
})

const updateQuantities = (state, {payload}) => ({
  ...state,
  modelConfigs: state.modelConfigs.map(modelConfig => {
    if (modelConfig.type === 'UPLOADING' || payload.ids.indexOf(modelConfig.id) !== -1) {
      return modelConfig
    }
    return {
      ...modelConfig,
      quantity: payload.quantity
    }
  })
})

export const reducer = (state: ModelState = initialState, action: AppAction): ModelState => {
  switch (action.type) {
    case 'MODEL.UPLOAD_FILE':
      return uploadFile(state, action)
    case 'MODEL.UPLOAD_PROGRESS':
      return uploadProgress(state, action)
    case 'MODEL.UPLOAD_COMPLETE':
      return uploadComplete(state, action)
    case 'MODEL.UPLOAD_FAIL':
      return uploadFail(state, action)
    case 'MODEL.DELETE_MODEL_CONFIGS':
      return deleteModelConfigs(state, action)
    case 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS':
      return updateSelectedModelConfigs(state, action)
    case 'MODEL.UPDATE_QUANTITIES':
      return updateQuantities(state, action)
    default:
      return state
  }
}

export default reducer
