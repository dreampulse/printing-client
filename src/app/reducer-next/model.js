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
  ModelConfig
} from '../type-next'
import type {AppAction} from '../action-next'
import * as modelAction from '../action-next/model'

export type ModelState = {
  uploadingFiles: {[id: ModelId]: UploadingFile},
  backendModels: {[id: ConfigId]: BackendModel},
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
  const configId = payload.configId

  const file = {
    configId,
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
        [configId]: file
      },
      modelConfigs: [
        ...state.modelConfigs,
        {
          type: 'UPLOADING',
          id: configId
        }
      ]
    },
    Cmd.run(uploadModel, {
      args: [
        payload.file,
        {unit: 'mm'},
        progress => Cmd.dispatch(modelAction.uploadProgress(configId, progress))
      ],
      successActionCreator: model => modelAction.uploadComplete(configId, model),
      failActionCreator: error => modelAction.uploadFail(configId, error)
    })
  )
}

const uploadProgress = (state, {payload}) => {
  const configId = payload.configId

  invariant(
    state.uploadingFiles[configId],
    `Error in uploadProgress(): File ${configId} is unknown`
  )

  return loop(
    {
      ...state,
      uploadingFiles: {
        ...state.uploadingFiles,
        [configId]: {
          ...state.uploadingFiles[configId],
          progress: payload.progress
        }
      }
    },
    Cmd.run(uploadModel, {
      args: [
        payload,
        {unit: 'mm'},
        progress => Cmd.dispatch(modelAction.uploadProgress(configId, progress))
      ],
      successActionCreator: model => modelAction.uploadComplete(configId, model),
      failActionCreator: error => modelAction.uploadFail(configId, error)
    })
  )
}

const uploadComplete = (state, {payload}) => {
  const configId = payload.configId
  const model = payload.model

  invariant(
    state.uploadingFiles[configId],
    `Error in uploadComplete(): File ${configId} is unknown`
  )

  return {
    ...state,
    backendModels: {
      ...state.backendModels,
      [configId]: model
    },
    modelConfigs: [
      ...state.modelConfigs.filter(modelConfig => modelConfig.id !== configId),
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: model.modelId,
        id: configId,
        quoteId: null,
        shippingId: null
      }
    ]
  }
}

const uploadFail = (state, {payload}) => {
  const configId = payload.configId

  invariant(state.uploadingFiles[configId], `Error in uploadFail(): File ${configId} is unknown`)

  return {
    ...state,
    uploadingFiles: {
      ...state.uploadingFiles,
      [configId]: {
        ...state.uploadingFiles[configId],
        error: true,
        errorMessage: payload.error.message
      }
    }
  }
}

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
    default:
      return state
  }
}

export default reducer
