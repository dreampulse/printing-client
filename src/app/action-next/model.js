// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, BackendModel, ConfigId, FileId} from '../type-next'

type UploadFileAction = Action<
  'MODEL.UPLOAD_FILE',
  {fileId: FileId, configId: ConfigId, file: File}
>
type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {fileId: string, progress: number}>
type UploadCompleteAction = Action<'MODEL.UPLOAD_COMPLETE', {fileId: string, model: BackendModel}>
type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {fileId: string, error: Error}>
type DeleteModelConfigsAction = Action<'MODEL.DELETE_MODEL_CONFIGS', {ids: Array<ConfigId>}>
type UpdateSelectedModelConfigsAction = Action<
  'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  {ids: Array<ConfigId>}
>
type UpdateQuantitiesAction = Action<
  'MODEL.UPDATE_QUANTITIES',
  {ids: Array<ConfigId>, quantity: number}
>

export type ModelAction =
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction
  | DeleteModelConfigsAction
  | UpdateSelectedModelConfigsAction
  | UpdateQuantitiesAction

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    fileId: uniqueId('file-id-'),
    configId: uniqueId('config-id-')
  }
})

export const uploadProgress = (fileId: FileId, progress: number): UploadProgressAction => ({
  type: 'MODEL.UPLOAD_PROGRESS',
  payload: {progress, fileId}
})

export const uploadComplete = (fileId: FileId, model: BackendModel): UploadCompleteAction => ({
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

export const deleteModelConfigs = (ids: Array<ConfigIds>): DeleteModelConfigsAction => ({
  type: 'MODEL.DELETE_MODEL_CONFIGS',
  payload: {
    ids
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

export const updateQuantities = (
  ids: Array<ConfigIds>,
  quantity: number
): UpdateQuantitiesAction => ({
  type: 'MODEL.UPDATE_QUANTITIES',
  payload: {
    ids,
    quantity
  }
})

// TODO: add a method to remove a file when the upload failed
// TODO: add a method to duplicate a basket item
