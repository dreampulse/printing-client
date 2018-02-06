// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, Model} from '../type-next'

type UploadFileAction = Action<'MODEL.UPLOAD_FILE', {fileId: string, file: File}>
type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {fileId: string, progress: number}>
type UploadCompleteAction = Action<'MODEL.UPLOAD_COMPLETE', {fileId: string, model: Model}>
type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {fileId: string, error: Error}>
type DeleteBasketItemAction = Action<'MODEL.DELETE_BASKET_ITEM', {itemId: number}>
type UpdateSelectedModelConfigsAction = Action<
  'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  {ids: Array<ConfigIds>}
>

export type ModelAction =
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction
  | DeleteBasketItemAction
  | UpdateSelectedModelConfigsAction

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    fileId: uniqueId('file-id-')
  }
})

export const uploadProgress = (fileId: string, progress: number): UploadProgressAction => ({
  type: 'MODEL.UPLOAD_PROGRESS',
  payload: {progress, fileId}
})

export const uploadComplete = (fileId: string, model: Model): UploadCompleteAction => ({
  type: 'MODEL.UPLOAD_COMPLETE',
  payload: {fileId, model}
})

export const uploadFail = (fileId: string, error: Error): UploadFailAction => ({
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

export const updateSelectedModelConfigs = (
  ids: Array<ConfigIds>
): UpdateSelectedModelConfigsAction => ({
  type: 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  payload: {
    ids
  }
})

// TODO: add a method to remove a file when the upload failed
// TODO: add a method to duplicate a basket item
