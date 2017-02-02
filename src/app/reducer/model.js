import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  areAllUploadsFinished: false,
  numberOfUploads: 0,
  selectedUnit: 'mm',
  models: {}
}

// function handleUploadStarted (state, {payload}) {
//   return {
//     ...state,
//     modelId: payload
//   }
// }
//
// function handleUploadFinished (state) {
//   return {
//     ...state,
//     isUploadFinished: true
//   }
// }

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

function handleUploadToBackedFinished (state, {payload: {fileId, modelId}}) {
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
        modelId
      }
    }
  }
}

function handleUploadToBackedFailed (state, {payload: {fileId}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads - 1,
    models: {
      ...state.models,
      [fileId]: {
        ...state.models[fileId],
        error: true
      }
    }
  }
}

export default handleActions({
  [TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED]: handleUploadToBackedStarted,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED]: handleUploadToBackedProgressed,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED]: handleUploadToBackedFinished,
  [TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED]: handleUploadToBackedFailed
  // [TYPE.MODEL.UPLOAD_FINISHED]: handleUploadFinished,
  // [TYPE.MODEL.UPLOAD_STARTED]: handleUploadStarted
}, initialState)

