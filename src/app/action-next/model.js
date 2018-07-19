// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, BackendModel, ConfigId, FileId, ModelConfig} from '../type-next'

type UploadFileAction = Action<
  'MODEL.UPLOAD_FILE',
  {fileId: FileId, configId: ConfigId, file: File}
>
type UploadFilesAction = Action<'MODEL.UPLOAD_FILES', Array<File>>
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
type DuplicateModelConfigAction = Action<
  'MODEL.DUPLICATE_MODEL_CONFIG',
  {id: ConfigId, nextId: ConfigId}
>

export type ModelAction =
  | UploadFileAction
  | UploadFilesAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction
  | DeleteModelConfigsAction
  | UpdateSelectedModelConfigsAction
  | UpdateQuantitiesAction
  | DuplicateModelConfigAction

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    fileId: uniqueId('file-id-'),
    configId: uniqueId('config-id-')
  }
})

export const uploadFiles = (files: FileList): UploadFileAction | UploadFilesAction => {
  const filesAsArray = Array.from(files)

  return filesAsArray.length === 1
    ? uploadFile(filesAsArray[0])
    : {
        type: 'MODEL.UPLOAD_FILES',
        payload: filesAsArray
      }
}

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

export const deleteModelConfigs = (ids: Array<ConfigId>): DeleteModelConfigsAction => ({
  type: 'MODEL.DELETE_MODEL_CONFIGS',
  payload: {
    ids
  }
})

export const updateSelectedModelConfigs = (
  ids: Array<ConfigId>
): UpdateSelectedModelConfigsAction => ({
  type: 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  payload: {
    ids
  }
})

export const updateQuantities = (
  ids: Array<ConfigId>,
  quantity: number
): UpdateQuantitiesAction => ({
  type: 'MODEL.UPDATE_QUANTITIES',
  payload: {
    ids,
    quantity
  }
})

export const duplicateModelConfig = (id: ConfigId): DuplicateModelConfigAction => ({
  type: 'MODEL.DUPLICATE_MODEL_CONFIG',
  payload: {
    id,
    nextId: uniqueId('config-id-')
  }
})
