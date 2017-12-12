// @flow

import omit from 'lodash/omit'
import {loop, Cmd} from 'redux-loop'
import invariant from 'invariant'
import {listMaterials, uploadModel} from 'App/lib/printing-engine'
import type {BasketItem, UploadingFile, Model, MaterialGroup} from 'App/type-next'
import type {AppAction} from 'App/action-next'
import * as core from 'App/action-next/core'
import * as modal from 'App/action-next/modal'

export type CoreState = {
  models: {[id: string]: Model},
  uploadingFiles: {[id: string]: UploadingFile},
  basket: {
    items: Array<BasketItem>
  },
  materialGroups: Array<MaterialGroup> // This is the material-structure-Tree
}

const initialState: CoreState = {
  models: {},
  uploadingFiles: {},
  basket: {
    items: []
  },
  materialGroups: []
}

const loadMaterialGroups = (state, action) =>
  loop(
    state,
    Cmd.run(listMaterials, {
      args: [],
      successActionCreator: res => core.updateMaterialGroups(res.materialStructure),
      failActionCreator: modal.openFatalErrorModal
    })
  )

const updateMaterialGroups = (state, action) => ({
  ...state,
  materialGroups: action.payload
})

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
      basket: {
        items: [
          ...state.basket.items,
          {
            id: state.basket.items.length,
            pending: true,
            fileId
          }
        ]
      }
    },
    Cmd.run(uploadModel, {
      args: [
        payload.file,
        {unit: 'mm'},
        progress => Cmd.dispatch(core.uploadProgress(fileId, progress))
      ],
      successActionCreator: model => core.uploadComplete(fileId, model),
      failActionCreator: error => core.uploadFail(fileId, error)
    })
  )
}

const uploadProgress = (state, {payload}) => {
  const fileId = payload.fileId

  invariant(
    state.uploadingFiles[fileId],
    `Could not update file upload progress: File ${fileId} is unknown`
  )

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
        progress => Cmd.dispatch(core.uploadProgress(fileId, progress))
      ],
      successActionCreator: model => core.uploadComplete(fileId, model),
      failActionCreator: error => core.uploadFail(fileId, error)
    })
  )
}

const uploadComplete = (state, {payload}) => {
  const fileId = payload.fileId
  const model = payload.model

  invariant(
    state.uploadingFiles[fileId],
    `Could not update file upload progress: File ${fileId} is unknown`
  )

  const updateBasketItem = item => {
    if (item.pending && item.fileId === fileId)
      return {
        id: item.id,
        pending: false,
        quantity: 1,
        modelId: model.modelId,
        material: null // No material selected
      }

    return item
  }

  return {
    ...state,
    uploadingFiles: omit(state.uploadingFiles, fileId),
    models: {
      ...state.models,
      [model.modelId]: model
    },
    basket: {
      items: state.basket.items.map(updateBasketItem)
    }
  }
}

const uploadFail = (state, {payload}) => {
  const fileId = payload.fileId

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

export const reducer = (state: CoreState = initialState, action: AppAction): CoreState => {
  switch (action.type) {
    case 'INIT.INIT':
      return loadMaterialGroups(state, action)
    case 'CORE.UPDATE_MATERIAL_GROUPS':
      return updateMaterialGroups(state, action)
    case 'CORE.UPLOAD_FILE':
      return uploadFile(state, action)
    case 'CORE.UPLOAD_PROGRESS':
      return uploadProgress(state, action)
    case 'CORE.UPLOAD_COMPLETE':
      return uploadComplete(state, action)
    case 'CORE.UPLOAD_FAIL':
      return uploadFail(state, action)
    default:
      return state
  }
}

export default reducer
