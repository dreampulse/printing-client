// @flow

import {loop, Cmd} from 'redux-loop'
import cloneDeep from 'lodash/cloneDeep'
import uniqueId from 'lodash/uniqueId'

import {listMaterials, uploadModel} from 'App/lib/printing-engine'
import {generateMaterialIds} from 'App/lib/material'
import type {Model, UploadingModel, MaterialGroup} from 'App/type-next'
import type {AppAction} from 'App/action-next'
import * as core from 'App/action-next/core'
import * as modal from 'App/action-next/modal'

export type CoreState = {
  models: Array<Model>,
  uploadingModels: Array<UploadingModel>,
  materialGroups: Array<MaterialGroup> // This is the material-structure-Tree
}

const initialState: CoreState = {
  models: [],
  uploadingModels: [],
  materialGroups: []
}

const loadMaterialGroups = (state, action) =>
  loop(
    state,
    Cmd.run(listMaterials, {
      args: [],
      successActionCreator: core.updateMaterialGroups,
      failActionCreator: modal.openFatalErrorModal
    })
  )

const updateMaterialGroups = (state, action) => {
  const materialGroups = cloneDeep(action.payload)

  generateMaterialIds(materialGroups)

  return {
    ...state,
    materialGroups
  }
}

const uploadFile = (state, {payload}) => {
  const fileId = uniqueId('file-id-')
  const fileName = payload.name
  const fileSize = payload.size

  return loop(
    {
      ...state,
      uploadingModels: [
        ...state.uploadingModels,
        {
          fileId,
          fileName,
          fileSize,
          progress: 0,
          error: false
        }
      ]
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
  const model: Model = {
    ...payload.model,
    quantity: 1
  }

  // Remove the now uploaded model from the list of uploading Models
  const uploadingModels = state.uploadingModels.filter(
    uploadingModel => uploadingModel.fileId !== payload.fileId
  )

  // TODO: same modelId issue

  return {
    ...state,
    uploadingModels,
    models: [...state.models, model]
  }
}

const uploadFail = (state, {payload}) => {
  const uploadingModels = state.uploadingModels.map(uploadingModel => {
    // The upload of this model has failed
    if (uploadingModel.fileId === payload.fileId) {
      return {...uploadingModel, error: true, errorMessage: payload.error.message}
    }
    return uploadingModel
  })

  return {
    ...state,
    uploadingModels
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
    case 'CORE.UPLOAD_COMPLETE':
      return uploadComplete(state, action)
    case 'CORE.UPLOAD_FAIL':
      return uploadFail(state, action)
    default:
      return state
  }
}

export default reducer
