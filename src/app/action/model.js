import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'

import pollApi from '../lib/poll-api'
import * as printingEngine from '../lib/printing-engine'
import {createPriceRequest} from './price'

import TYPE from '../type'

export const changeQuantity = ({quantity}) =>
  createAction(TYPE.MODEL.QUANTITIY_CHANGED)({quantity})

export const changeIndividualQuantity = ({quantity, modelId}) =>
  createAction(TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED)({quantity, modelId})

export const changeUnit = ({unit}) =>
  createAction(TYPE.MODEL.UNIT_CHANGED)({unit})

export const checkUploadStatus = ({modelId}) => async (dispatch) => {
  dispatch(createAction(TYPE.MODEL.CHECK_STATUS_STARTED)({modelId}))

  try {
    await pollApi(() => printingEngine.getUploadStatus({modelId}))
    dispatch(createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)({modelId}))
  } catch (e) {
    dispatch(createAction(TYPE.MODEL.CHECK_STATUS_FINISHED)({modelId, error: true}))
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
    const {modelId, thumbnailUrl} =
      await printingEngine.uploadModel(file, {unit}, onUploadProgressed)
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)({modelId, fileId, thumbnailUrl}))
    return {modelId, thumbnailUrl}
  } catch (e) {
    dispatch(createAction(TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)({fileId, error: true}))
    throw new Error()
  }
}

export const uploadFiles = files => dispatch => (
  Promise.all(
    files.map(async (file) => {
      const {modelId} = await dispatch(uploadFile(file))
      await dispatch(checkUploadStatus({modelId}))
      await dispatch(createPriceRequest())
    })
  )
)
