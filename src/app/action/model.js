import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'
import {compose} from 'ramda'

import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'
import {createPriceRequest} from '../action/price'

import TYPE from '../type'

export const checkUploadStatus = ({modelId, fileId}) => async (dispatch) => {
  dispatch(createAction(TYPE.MODEL.CHECK_STATUS_STARTED)({fileId}))

  try {
    await pollApi(() => printingEngine.getUploadStatus({modelId}))
    dispatch(createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)({fileId}))
    await dispatch(createPriceRequest())
  } catch (e) {
    dispatch(createAction(TYPE.MODEL.CHECK_STATUS_FAILED)({fileId}))
  }
}

export const uploadFile = file => async (dispatch, getState) => {
  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_STARTED)({
    fileId,
    name: file.name,
    size: file.size
  }))

  const onUploadProgressed = progress =>
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_PROGRESSED)({progress, fileId}))

  try {
    const {modelId} = await printingEngine.uploadModel(file, {unit}, onUploadProgressed)
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)({modelId, fileId}))
    await dispatch(checkUploadStatus({modelId, fileId}))
  } catch (e) {
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)({fileId}))
  }
}

export const uploadFiles = files => async (dispatch) => {
  await Promise.all(files.map(compose(dispatch, uploadFile)))
}
