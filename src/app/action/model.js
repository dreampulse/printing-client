import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'

import {uploadModel} from 'Lib/printing-engine'
import {FileUploadError} from 'Lib/error'
import {
  createPriceRequest,
  createDebouncedPriceRequest
} from './price'

import TYPE from '../type'

// Private actions

const quantityChanged = createAction(
  TYPE.MODEL.QUANTITIY_CHANGED,
  quantity => ({quantity})
)
const individualQuantityChanged = createAction(
  TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED,
  (modelId, quantity) => ({modelId, quantity})
)
const fileUploadStarted = createAction(
  TYPE.MODEL.FILE_UPLOAD_STARTED,
  (fileId, file) => ({
    fileId,
    fileName: file.name,
    fileSize: file.size
  })
)
const fileUploadProgressed = createAction(
  TYPE.MODEL.FILE_UPLOAD_PROGRESSED,
  (fileId, progress) => ({fileId, progress})
)
const fileUploaded = createAction(
  TYPE.MODEL.FILE_UPLOADED,
  (fileId, model) => ({
    fileId,
    modelId: model.modelId,
    thumbnailUrl: model.thumbnailUrl,
    fileName: model.fileName,
    fileUnit: model.fileUnit,
    dimensions: model.dimensions,
    area: model.area,
    volume: model.volume
  })
)
const fileDeleted = createAction(TYPE.MODEL.FILE_DELETED, fileId => ({fileId}))

// Public actions

export const changeQuantity = ({quantity}) => (dispatch) => {
  dispatch(quantityChanged(quantity))
  // Update prices
  return dispatch(createDebouncedPriceRequest())
}

export const changeIndividualQuantity = ({quantity, modelId}) => (dispatch) => {
  dispatch(individualQuantityChanged(modelId, quantity))
  // Update prices
  return dispatch(createDebouncedPriceRequest())
}

export const changeUnit = createAction(TYPE.MODEL.UNIT_CHANGED, ({unit}) => ({unit}))

const uploadFile = (file, {refresh}) => async (dispatch, getState) => {
  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  // TODO: reduce number of actions here and let multiple reducers listen to the same action
  dispatch(createAction(TYPE.PRICE.CLEAR_OFFERS)())
  dispatch(createAction(TYPE.MATERIAL.CONFIG_SELECTED)()) // Resets current selection
  dispatch(fileUploadStarted(fileId, file))

  const onUploadProgressed = progress => dispatch(fileUploadProgressed(fileId, progress))

  try {
    const modelData = await uploadModel(file, {unit, refresh}, onUploadProgressed)
    dispatch(fileUploaded(fileId, modelData))
  } catch (error) {
    const uploadError = new FileUploadError(fileId)
    dispatch(fileUploaded(uploadError))
    throw uploadError  // Prevent to create a price request if upload failed
  }
}

export const uploadFiles = (files, {refresh}) => dispatch => (
  Promise.all(
    files.map(file => dispatch(uploadFile(file, {refresh})))
  )
  .then(() => dispatch(createPriceRequest({refresh})))
  .catch(() => {
    // Ignore upload error
    // It has already been handled in uploadFile()
  })
)

export const deleteFile = fileId => async (dispatch) => {
  dispatch(fileDeleted(fileId))
  await dispatch(createPriceRequest())
}
