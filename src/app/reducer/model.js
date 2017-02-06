import {handleActions} from 'redux-actions'

import TYPE from '../type'
import {update} from '../lib/util'

const initialState = {
  areAllUploadsFinished: false,
  numberOfUploads: 0,
  selectedUnit: 'mm',
  models: []
}

function handleUploadToBackedStarted (state, {payload: {fileId, name, size}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads + 1,
    models: [
      ...state.models, {
        fileId,
        name,
        size,
        progress: 0
      }
    ]
  }
}

function handleUploadToBackedProgressed (state, {payload: {fileId, progress}}) {
  const updateModels = update(state.models, model => model.fileId === fileId)

  return {
    ...state,
    models: updateModels({
      progress
    })
  }
}

function handleUploadToBackedFinished (state, {error, payload: {fileId, modelId}}) {
  const updateModels = update(state.models, model => model.fileId === fileId)
  const areAllUploadsFinished = state.numberOfUploads === 1

  return {
    ...state,
    areAllUploadsFinished,
    numberOfUploads: state.numberOfUploads - 1,
    models: updateModels({
      progress: 1,
      modelId,
      error
    })
  }
}

function handleCheckStatusStarted (state, {payload: {fileId}}) {
  const updateModels = update(state.models, model => model.fileId === fileId)

  return {
    ...state,
    models: updateModels({
      checkStatusFinished: false
    })
  }
}

function handleCheckStatusFinished (state, {error, payload: {fileId}}) {
  const updateModels = update(state.models, model => model.fileId === fileId)

  return {
    ...state,
    models: updateModels({
      checkStatusFinished: true,
      error
    })
  }
}

export default handleActions({
  [TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED]: handleUploadToBackedStarted,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED]: handleUploadToBackedProgressed,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED]: handleUploadToBackedFinished,
  [TYPE.MODEL.CHECK_STATUS_STARTED]: handleCheckStatusStarted,
  [TYPE.MODEL.CHECK_STATUS_FINISHED]: handleCheckStatusFinished
}, initialState)

