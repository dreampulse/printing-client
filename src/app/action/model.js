import {createAction} from 'redux-actions'

import uniqueId from 'lodash/uniqueId'

import TYPE from '../type'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const uploadFile = file => async (dispatch, getState) => {
  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)({
    fileId,
    name: file.name,
    size: file.size
  }))

  try {
    const {modelId} = await printingEngine.uploadModel(file, (progress) => {
      dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)({
        fileId,
        progress
      }))
    }, {
      unit
    })

    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)({
      fileId,
      modelId
    }))
  } catch (error) {
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)({fileId, error}))
  }
}

// export const modelsUploaded = ({modelId, fileId}) => async (dispatch) => {
//   dispatch(createAction(TYPE.MODEL.UPLOAD_STARTED)({modelId, fileId}))
//   try {
//     await pollApi(() => printingEngine.getUploadStatus({modelId}))
//     dispatch(createAction(TYPE.MODEL.UPLOAD_FINISHED)({fileId}))
//   } catch (e) {
//     dispatch(createAction(TYPE.MODEL.UPLOAD_FAILED)({fileId}))
//   }
// }
//
// export const uploadFiles = files => async (dispatch, getState) => {
//   await Promise.all(files.map(file => dispatch(uploadFile(file))))
//   const models = getState().model.models
//
//   Object.keys(models)
//     .reduce((last, cur) => (cur.error ? last : [...last, cur]), [])
//     .map(fileId => models[fileId].modelId)
//     .forEach(modelId => dispatch(modelsUploaded({modelId})))
// }


export const uploadFiles = files => async (dispatch) => {
  await Promise.all(files.map(file => dispatch(uploadFile(file))))
}
