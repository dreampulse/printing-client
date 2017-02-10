import {bindActionCreators} from 'redux'
import {createAction} from 'redux-actions'

import uniqueId from 'lodash/uniqueId'

import TYPE from '../type'

import * as actionCreator from '../action-creator'
import {createPriceRequest} from './price'
import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'

export const checkUploadStatus = ({modelId, fileId}) => (dispatch) => {
  const {
    modelCheckStatusStarted,
    modelCheckStatusFinished
  } = bindActionCreators(actionCreator, dispatch)

  modelCheckStatusStarted({fileId})

  return modelCheckStatusFinished(
    pollApi(() => printingEngine.getUploadStatus({modelId}))
      .then(() => ({fileId}))
      .catch(() => Promise.reject({fileId}))
  )
}

// export const uploadFile = file => async (dispatch, getState) => {
//   const {
//     modelUploadToBackendStarted,
//     modelUploadToBackendProgressed,
//     modelUploadToBackendFinished
//   } = bindActionCreators(actionCreator, dispatch)
//
//   const fileId = uniqueId('file-id-')
//   const unit = getState().model.selectedUnit
//
//   modelUploadToBackendStarted({
//     fileId,
//     name: file.name,
//     size: file.size
//   })
//
//   const {payload: {modelId}} = await modelUploadToBackendFinished(
//     printingEngine.uploadModel(
//       file,
//       {unit},
//       (progress) => {
//         modelUploadToBackendProgressed({
//           fileId,
//           progress
//         })
//       }
//     ).then(({modelId}) => ({modelId, fileId})
//     ).catch(() => Promise.reject({fileId}))
//   )
//
//   return {modelId, fileId}
// }

// export const uploadFiles = files => async (dispatch) => {
//   await Promise.all(files.map(async (file) => {
//     try {
//       const {modelId, fileId} = await dispatch(uploadFile(file))
//       return dispatch(checkUploadStatus({modelId, fileId}))
//     } catch (e) {
//       return Promise.reject()
//     }
//   }))
//
//   return dispatch(createPriceRequest())
// }

export const uploadFiles = createAction(TYPE.MODEL.UPLOAD_FILES)
export const uploadFile = createAction(TYPE.MODEL.UPLOAD_FILE)
