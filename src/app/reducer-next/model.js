// @flow

import omit from 'lodash/omit'
import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import {uploadModel} from '../service/printing-engine'
import type {UploadingFile, FileId, Model, ModelId, BasketItem} from '../type-next'
import type {AppAction} from '../action-next'
import * as modelAction from '../action-next/model'

export type ModelState = {
  models: {[id: ModelId]: Model},
  uploadingFiles: {[id: FileId]: UploadingFile},
  basketItems: Array<BasketItem>
}

const initialState: ModelState = {
  models: {},
  uploadingFiles: {},
  basketItems: []
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
      }
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
    uploadingFiles: omit(state.uploadingFiles, fileId),
    models: {
      ...state.models,
      [model.modelId]: model
    },
    basketItems: [
      ...state.basketItems,
      {
        quantity: 1,
        modelId: model.modelId,
        material: null // No material selected
      }
    ]
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

const deleteBasketItem = (state, {payload}) => {
  invariant(
    payload.itemId >= 0 && state.basketItems.length > payload.itemId,
    `Invalid basket item id`
  )

  const itemToDelete = state.basketItems[payload.itemId]
  // const modelItems = state.basketItems.filter(item => item.modelId === itemToDelete.modelId)
  const updatedItems = state.basketItems.filter((item, itemId) => itemId !== payload.itemId)

  // TODO: add this check when its testable
  // const models = modelItems.length === 1 ? omit(state.models, itemToDelete.modelId) : state.models
  const models = omit(state.models, itemToDelete.modelId)

  return {
    ...state,
    models,
    basketItems: updatedItems
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
    case 'MODEL.DELETE_BASKET_ITEM':
      return deleteBasketItem(state, action)
    default:
      return state
  }
}

export default reducer
