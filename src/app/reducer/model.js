import {map} from 'ramda'
import {handleActions} from 'redux-actions'

import TYPE from '../type'
import {update} from '../lib/util'

const initialState = {
  areAllUploadsFinished: false,
  numberOfUploads: 0,
  selectedUnit: 'mm',
  uploadedModels: [],
  models: {}
}

function handleUnitChanged (state, {payload: {unit}}) {
  return {
    ...state,
    selectedUnit: unit
  }
}

function handleIndividualQuantityChanged (state, {payload: {quantity, modelId}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [modelId]: {
        ...state.models[modelId],
        quantity
      }
    }
  }
}

function handleQuantityChanged (state, {payload: {quantity}}) {
  const models = map(model => ({
    ...model,
    quantity
  }), state.models)

  return {
    ...state,
    models
  }
}

function handleUploadToBackedStarted (state, {payload: {fileId, name, size}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads + 1,
    uploadedModels: [
      ...state.uploadedModels, {
        fileId,
        name,
        size,
        progress: 0
      }
    ]
  }
}

function handleUploadToBackedProgressed (state, {payload: {fileId, progress}}) {
  const updateModels = update(state.uploadedModels, model => model.fileId === fileId)

  return {
    ...state,
    uploadedModels: updateModels({
      progress
    })
  }
}

function handleUploadToBackedFinished (state, {payload: {fileId, modelId, thumbnailUrl, error}}) {
  const updateModels = update(state.uploadedModels, model => model.fileId === fileId)
  const uploadingModel = state.uploadedModels
    .filter(model => model.fileId === fileId)[0]
  const areAllUploadsFinished = state.numberOfUploads === 1

  if (error) {
    return {
      ...state,
      areAllUploadsFinished,
      uploadedModels: updateModels({
        progress: 1,
        error
      })
    }
  }

  return {
    ...state,
    numberOfUploads: state.numberOfUploads - 1,
    uploadedModels: updateModels({
      progress: 1,
      uploadFinished: 1,
      modelId,
      thumbnailUrl
    }),
    models: {
      ...state.models,
      [modelId]: {
        ...uploadingModel,
        modelId,
        thumbnailUrl,
        quantity: 1
      }
    }
  }
}

function handleCheckStatusStarted (state, {payload: {modelId}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [modelId]: {
        ...state.models[modelId],
        checkStatusFinished: false
      }
    }
  }
}

function handleCheckStatusFinished (state, {payload: {modelId, error}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [modelId]: {
        ...state.models[modelId],
        checkStatusFinished: true,
        error
      }
    }
  }
}

export default handleActions({
  [TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED]: handleUploadToBackedStarted,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED]: handleUploadToBackedProgressed,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED]: handleUploadToBackedFinished,
  [TYPE.MODEL.CHECK_STATUS_STARTED]: handleCheckStatusStarted,
  [TYPE.MODEL.CHECK_STATUS_FINISHED]: handleCheckStatusFinished,
  [TYPE.MODEL.QUANTITIY_CHANGED]: handleQuantityChanged,
  [TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED]: handleIndividualQuantityChanged,
  [TYPE.MODEL.UNIT_CHANGED]: handleUnitChanged
}, initialState)
