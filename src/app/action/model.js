// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'
import uniqueId from 'lodash/uniqueId'

import {uploadModel} from 'Lib/printing-engine'
import {FileUploadError} from 'Lib/error'
import {
  createPriceRequest,
  createDebouncedPriceRequest
} from './price'

import type {State, File, ModelBackend} from '../type'
import TYPE from '../action-type'

// Sync actions

const quantityChanged = createAction(
  TYPE.MODEL.QUANTITIY_CHANGED,
  (quantity : number) => ({quantity})
)
const individualQuantityChanged = createAction(
  TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED,
  (modelId : string, quantity : number) => ({modelId, quantity})
)
const fileUploadStarted = createAction(
  TYPE.MODEL.FILE_UPLOAD_STARTED,
  (fileId : string, file : File) => ({
    fileId,
    fileName: file.name,
    fileSize: file.size
  })
)
const fileUploadProgressed = createAction(
  TYPE.MODEL.FILE_UPLOAD_PROGRESSED,
  (fileId : string, progress : number) => ({fileId, progress})
)
const fileUploadFailed = createAction(
  TYPE.MODEL.FILE_UPLOAD_FAILED,
  (fileId : string, error : Error) => ({fileId, error})
)
const fileUploaded = createAction(
  TYPE.MODEL.FILE_UPLOADED,
  (fileId : string, model : ModelBackend) => ({
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
const fileDeleted = createAction(
  TYPE.MODEL.FILE_DELETED,
  (fileId : string) => ({fileId}))
export const changeUnit = createAction(
  TYPE.MODEL.UNIT_CHANGED,
  ({unit} : {unit: 'mm' | 'cm' | 'in'}) => ({unit}))  // @TODO improve interface

// Async actions

export const changeQuantity = (
  {quantity} : {quantity: number}  // @TODO improve interface
) => (
  dispatch : Dispatch<*>
) => {
  dispatch(quantityChanged(quantity))
  // Update prices
  return dispatch(createDebouncedPriceRequest())
}

export const changeIndividualQuantity = (
  {quantity, modelId} : {quantity: number, modelId: string}
) => (
  dispatch : Dispatch<*>
) => {
  dispatch(individualQuantityChanged(modelId, quantity))
  // Update prices
  return dispatch(createDebouncedPriceRequest())
}

const uploadFile = (
  file : File
) => async (
  dispatch : Dispatch<*>,
  getState : () => State
) => {
  const fileId = uniqueId('file-id-')
  const unit = getState().model.selectedUnit

  // TODO: reduce number of actions here and let multiple reducers listen to the same action
  dispatch(createAction(TYPE.PRICE.CLEAR_OFFERS)())
  dispatch(createAction(TYPE.MATERIAL.CONFIG_SELECTED)()) // Resets current selection
  dispatch(fileUploadStarted(fileId, file))

  const onUploadProgressed = progress => dispatch(fileUploadProgressed(fileId, progress))

  try {
    const modelData = await uploadModel(file, {unit}, onUploadProgressed)
    dispatch(fileUploaded(fileId, modelData))
  } catch (error) {
    const uploadError = new FileUploadError(fileId)
    dispatch(fileUploadFailed(fileId, uploadError))
    throw uploadError  // Prevent to create a price request if upload failed
  }
}

export const uploadFiles = (
  files : File[]
) => async (
  dispatch : Dispatch<*>
) => {
  try {
    await Promise.all(files.map(file => dispatch(uploadFile(file))))
  } catch (err) {
    // Ignore upload error
    // It has already been handled in uploadFile()
    return
  }

  await dispatch(createPriceRequest())
}

export const deleteFile = (
  fileId : string
) => async (
  dispatch : Dispatch<*>
) => {
  dispatch(fileDeleted(fileId))
  await dispatch(createPriceRequest())
}
