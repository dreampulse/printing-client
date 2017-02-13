import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'
import {compose} from 'ramda'

import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'
import {createPriceRequest} from '../action/price'

import TYPE from '../type'

// Action creators
export const uploadToBackendStarted = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)
export const uploadToBackendProgressed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)
export const uploadToBackendFinished = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)
export const uploadToBackendFailed = createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)
export const checkStatusStarted = createAction(TYPE.MODEL.CHECK_STATUS_STARTED)
export const checkStatusFinished = createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)

export const checkUploadStatus = ({modelId, fileId}) => async (dispatch) => {
  dispatch(checkStatusStarted({fileId}))

  try {
    await pollApi(() => printingEngine.getUploadStatus({modelId}))
    dispatch(checkStatusFinished({fileId}))
    await dispatch(createPriceRequest())
  } catch (e) {
    dispatch(checkStatusFinished({fileId, error: true}))
  }
}

export const uploadFile = file => async (dispatch, getState) => {
  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  dispatch(
    uploadToBackendStarted({
      fileId,
      name: file.name,
      size: file.size
    })
  )

  const onUploadProgressed = progress =>
    dispatch(uploadToBackendProgressed({progress, fileId}))

  try {
    const {modelId} = await printingEngine.uploadModel(file, {unit}, onUploadProgressed)
    dispatch(uploadToBackendFinished({modelId, fileId}))
    await dispatch(checkUploadStatus({modelId, fileId}))
  } catch (e) {
    dispatch(uploadToBackendFailed({fileId, error: true}))
  }
}

export const uploadFiles = files => async (dispatch) => {
  await Promise.all(
    files.map(compose(dispatch, uploadFile))
  )
}
