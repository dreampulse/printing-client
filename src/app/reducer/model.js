import {handleActions} from 'redux-actions'

import TYPE from '../action-type'
import {updateArrayItems} from '../lib/util'

const initialState = {
  numberOfUploads: 0,
  selectedUnit: 'mm',
  models: []
}

function handleRestoreConfiguration (state, {payload: {items}}) {
  return {
    ...state,
    models: items.map((item, index) => ({
      ...item,
      uploadFinished: true,
      fileId: index
    }))
  }
}

function handleUnitChanged (state, {payload: {unit}}) {
  return {
    ...state,
    selectedUnit: unit
  }
}

function handleIndividualQuantityChanged (state, {payload: {quantity, modelId}}) {
  const updateModels = updateArrayItems(state.models, model => model.modelId === modelId)

  return {
    ...state,
    models: updateModels({
      quantity
    })
  }
}

function handleQuantityChanged (state, {payload: {quantity}}) {
  const updateModels = updateArrayItems(state.models, () => true)

  return {
    ...state,
    models: updateModels({
      quantity
    })
  }
}

function handleFileUploadStarted (state, {payload: {fileId, fileName, fileSize}}) {
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

function handleFileUploadProgressed (state, {payload: {fileId, progress}}) {
  const updateModels = updateArrayItems(state.models, model => model.fileId === fileId)

  return {
    ...state,
    models: updateModels({
      progress
    })
  }
}

function handleFileUploaded (state, {payload, error}) {
  const {fileId} = payload
  const updateModels = updateArrayItems(state.models, model => model.fileId === fileId)

  if (error) {
    return {
      ...state,
      numberOfUploads: state.numberOfUploads - 1,
      models: updateModels({
        progress: 1,
        error: payload
      })
    }
  }

  const {modelId, thumbnailUrl, fileName, fileUnit, dimensions, area, volume} = payload

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

function handleFileDeleted (state, {payload: {fileId}}) {
  return {
    ...state,
    models: state.models.filter(model => model.fileId !== fileId)
  }
}

export default handleActions({
  [TYPE.MODEL.FILE_UPLOAD_STARTED]: handleFileUploadStarted,
  [TYPE.MODEL.FILE_UPLOAD_PROGRESSED]: handleFileUploadProgressed,
  [TYPE.MODEL.FILE_UPLOADED]: handleFileUploaded,
  [TYPE.MODEL.FILE_DELETED]: handleFileDeleted,
  [TYPE.MODEL.QUANTITIY_CHANGED]: handleQuantityChanged,
  [TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED]: handleIndividualQuantityChanged,
  [TYPE.MODEL.UNIT_CHANGED]: handleUnitChanged,
  [TYPE.DIRECT_SALES.RESTORE_CONFIGURATION]: handleRestoreConfiguration
}, initialState)
