// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, Model, FileId} from '../type-next'

type UploadFileAction = Action<'MODEL.UPLOAD_FILE', {fileId: FileId, file: File}>
type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {fileId: FileId, progress: number}>
type UploadCompleteAction = Action<'MODEL.UPLOAD_COMPLETE', {fileId: FileId, model: Model}>
type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {fileId: FileId, error: Error}>
// TODO: Change itemId to a string id
type DeleteBasketItemAction = Action<'MODEL.DELETE_BASKET_ITEM', {itemId: number}>

export type ModelAction =
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction
  | DeleteBasketItemAction

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    fileId: uniqueId('file-id-')
  }
})

export const uploadProgress = (fileId: FileId, progress: number): UploadProgressAction => ({
  type: 'MODEL.UPLOAD_PROGRESS',
  payload: {progress, fileId}
})

export const uploadComplete = (fileId: FileId, model: Model): UploadCompleteAction => ({
  type: 'MODEL.UPLOAD_COMPLETE',
  payload: {fileId, model}
})

export const uploadFail = (fileId: FileId, error: Error): UploadFailAction => ({
  type: 'MODEL.UPLOAD_FAIL',
  payload: {
    fileId,
    error
  }
})

export const deleteBasketItem = (itemId: number): DeleteBasketItemAction => ({
  type: 'MODEL.DELETE_BASKET_ITEM',
  payload: {
    itemId
  }
})

// TODO: add a method to remove a file when the upload failed
// TODO: add a method to duplicate a basket item
