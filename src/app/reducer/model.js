import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  areAllUploadsFinished: false,
  numberOfUploads: 0,
  selectedUnit: 'mm',
  models: {}
}

function handleUploadToBackedStarted (state, {payload: {fileId, name, size}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads + 1,
    models: {
      ...state.models,
      [fileId]: {
        fileId,
        name,
        size,
        progress: 0
      }
    }
  }
}

function handleUploadToBackedProgressed (state, {payload: {fileId, progress}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [fileId]: {
        ...state.models[fileId],
        progress
      }
    }
  }
}

function handleUploadToBackedFinished (state, {error, payload: {fileId, modelId}}) {
  const areAllUploadsFinished = state.numberOfUploads === 1

  return {
    ...state,
    areAllUploadsFinished,
    numberOfUploads: state.numberOfUploads - 1,
    models: {
      ...state.models,
      [fileId]: {
        ...state.models[fileId],
        progress: 1,
        modelId,
        error
      }
    }
  }
}

function handleCheckStatusStarted (state, {payload: {fileId}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [fileId]: {
        ...state.models[fileId],
        checkStatusFinished: false
      }
    }
  }
}

function handleCheckStatusFinished (state, {error, payload: {fileId}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [fileId]: {
        ...state.models[fileId],
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
}, initialState)

