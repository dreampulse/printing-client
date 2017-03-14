import {handleActions} from 'redux-actions'

import TYPE from '../type'
import {update} from '../lib/util'

const initialState = {
  areAllUploadsFinished: false,
  numberOfUploads: 0,
  selectedUnit: 'mm',
  uploadingModels: [],
  models: {},
  quantity: 1
}

function handleIndividualQuantityChanged (state, {payload: {quantity, modelId}}) {
  return {
    ...state,
    models: {
      ...state.models,
      [modelId]: {
        ...state.model[modelId],
        quantity
      }
    }
  }
}

function handleQuantityChanged (state, {payload: {quantity}}) {
  const modelsArray = Object.keys(state.models).map(modelId => ({
    ...state.models[modelId],
    quantity
  }))

  const models = modelsArray.reduce((acc, next) =>
    ({...acc, [next.modelId]: next}), {})

  return {
    ...state,
    quantity,
    models
  }
}

function handleUploadToBackedStarted (state, {payload: {fileId, name, size}}) {
  return {
    ...state,
    numberOfUploads: state.numberOfUploads + 1,
    uploadingModels: [
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
  const updateModels = update(state.uploadingModels, model => model.fileId === fileId)

  return {
    ...state,
    uploadingModels: updateModels({
      progress
    })
  }
}

function handleUploadToBackedFinished (state, {payload: {fileId, modelId, error}}) {
  // TODO: The backend should return all needed fields Issue: #66
  const updateModels = update(state.uploadingModels, model => model.fileId === fileId)
  const uploadingModel = state.uploadingModels
    .filter(model => model.fileId === fileId)[0]
  const areAllUploadsFinished = state.numberOfUploads === 1

  if (error) {
    return {
      ...state,
      areAllUploadsFinished,
      numberOfUploads: state.numberOfUploads - 1,
      uploadingModels: updateModels({
        progress: 1,
        error
      })
    }
  }

  return {
    ...state,
    areAllUploadsFinished,
    numberOfUploads: state.numberOfUploads - 1,
    uploadingModels: updateModels({
      progress: 1,
      uploadFinished: 1,
      modelId
    }),
    models: {
      ...state.models,
      [modelId]: {
        ...uploadingModel,
        modelId,
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
  [TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED]: handleIndividualQuantityChanged
}, initialState)
