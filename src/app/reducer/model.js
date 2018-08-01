// @flow

import type {ModelState, ModelCompleted} from '../type'
import TYPE, {type Action} from '../action-type'

import {updateArrayItems} from '../lib/util-deprecated'

const initialState = {
  numberOfUploads: 0,
  selectedUnit: 'mm',
  models: []
}

function handleRestoreConfiguration(state, {payload: {items}}) {
  return {
    ...state,
    models: items.map(
      (item, index) =>
        ({
          ...item,
          uploadFinished: true,
          progress: 1,
          fileSize: -1, // @TODO: this is missing from the backend
          fileId: String(index)
        }: ModelCompleted)
    ) // This is due to a very compley Model-Type
  }
}

function handleUnitChanged(state, {payload: {unit}}) {
  return {
    ...state,
    selectedUnit: unit
  }
}

function handleIndividualQuantityChanged(state, {payload: {quantity, modelId}}) {
  const updateModels = updateArrayItems(state.models, model => model.modelId === modelId)

  return {
    ...state,
    models: updateModels({
      quantity
    })
  }
}

function handleQuantityChanged(state, {payload: {quantity}}) {
  const updateModels = updateArrayItems(state.models, () => true)

  return {
    ...state,
    models: updateModels({
      quantity
    })
  }
}

function handleFileUploadStarted(state, {payload: {fileId, fileName, fileSize}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads + 1,
    models: [
      ...state.models,
      {
        fileId,
        fileName,
        fileSize,
        progress: 0,
        uploadFinished: false
      }
    ]
  }
}

function handleFileUploadProgressed(state, {payload: {fileId, progress}}) {
  const updateModels = updateArrayItems(state.models, model => model.fileId === fileId)

  return {
    ...state,
    models: updateModels({
      progress
    })
  }
}

function handleFileUploaded(state, {payload}) {
  const {modelId, thumbnailUrl, fileName, fileUnit, dimensions, area, volume, fileId} = payload
  const updateModels = updateArrayItems(state.models, model => model.fileId === fileId)

  return {
    ...state,
    numberOfUploads: state.numberOfUploads - 1,
    models: updateModels({
      progress: 1,
      uploadFinished: true,
      quantity: 1,
      modelId,
      thumbnailUrl,
      fileName,
      fileUnit,
      dimensions,
      area,
      volume
    })
  }
}

function handleFileUploadFailed(state, {payload: {error, fileId}}) {
  const updateModels = updateArrayItems(state.models, model => model.fileId === fileId)

  return {
    ...state,
    numberOfUploads: state.numberOfUploads - 1,
    models: updateModels({
      progress: 1,
      error
    })
  }
}

function handleFileDeleted(state, {payload: {fileId}}) {
  return {
    ...state,
    models: state.models.filter(model => model.fileId !== fileId)
  }
}

const reducer = (state: ModelState = initialState, action: Action): ModelState => {
  switch (action.type) {
    case TYPE.MODEL.FILE_UPLOAD_STARTED:
      return handleFileUploadStarted(state, action)
    case TYPE.MODEL.FILE_UPLOAD_PROGRESSED:
      return handleFileUploadProgressed(state, action)
    case TYPE.MODEL.FILE_UPLOADED:
      return handleFileUploaded(state, action)
    case TYPE.MODEL.FILE_DELETED:
      return handleFileDeleted(state, action)
    case TYPE.MODEL.QUANTITIY_CHANGED:
      return handleQuantityChanged(state, action)
    case TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED:
      return handleIndividualQuantityChanged(state, action)
    case TYPE.MODEL.UNIT_CHANGED:
      return handleUnitChanged(state, action)
    case TYPE.MODEL.FILE_UPLOAD_FAILED:
      return handleFileUploadFailed(state, action)
    case TYPE.DIRECT_SALES.RESTORE_CONFIGURATION:
      return handleRestoreConfiguration(state, action)

    default:
      return state
  }
}

export default reducer
