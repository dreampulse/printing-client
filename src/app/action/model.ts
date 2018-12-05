import uniqueId from 'lodash/uniqueId'
import range from 'lodash/range'
import {Action, BackendModel, ConfigId, FileId} from '../type'

export type UploadFileAction = Action<
  'MODEL.UPLOAD_FILE',
  {
    fileId: FileId,
    configId: ConfigId,
    file: File,
    unit: string,
    fileIndex: number
  }
>
export type UploadFilesAction = Action<'MODEL.UPLOAD_FILES', {files: File[], unit: string}>
export type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {fileId: string, progress: number}>
export type UploadCompleteAction = Action<
  'MODEL.UPLOAD_COMPLETE',
  {
    fileId: string,
    models: BackendModel[],
    fileIndex: number,
    additionalConfigIds: ConfigId[]
  }
>
export type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {fileId: string, error: Error}>
export type DeleteModelConfigsAction = Action<'MODEL.DELETE_MODEL_CONFIGS', {ids: ConfigId[]}>
export type UpdateSelectedModelConfigsAction = Action<
  'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  {ids: ConfigId[]}
>
export type UpdateQuantitiesAction = Action<
  'MODEL.UPDATE_QUANTITIES',
  {ids: ConfigId[], quantity: number}
>
export type DuplicateModelConfigAction = Action<
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

export const uploadFile = (file: File, unit: string, fileIndex: number): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    fileId: uniqueId('file-id-'),
    configId: uniqueId('config-id-'),
    unit,
    fileIndex
  }
})

export const uploadFiles = (files: FileList, unit: string): UploadFilesAction => ({
  type: 'MODEL.UPLOAD_FILES',
  payload: {
    files: Array.from(files),
    unit
  }
})

export const uploadProgress = (fileId: FileId, progress: number): UploadProgressAction => ({
  type: 'MODEL.UPLOAD_PROGRESS',
  payload: {progress, fileId}
})

export const uploadComplete = (
  fileId: FileId,
  models: BackendModel[],
  fileIndex: number
): UploadCompleteAction => ({
  type: 'MODEL.UPLOAD_COMPLETE',
  payload: {
    fileId,
    models,
    fileIndex,
    additionalConfigIds: range(models.length - 1).map(() => uniqueId('config-id-'))
  }
})

export const uploadFail = (fileId: FileId, error: Error): UploadFailAction => ({
  type: 'MODEL.UPLOAD_FAIL',
  payload: {
    fileId,
    error
  }
})

export const deleteModelConfigs = (ids: ConfigId[]): DeleteModelConfigsAction => ({
  type: 'MODEL.DELETE_MODEL_CONFIGS',
  payload: {
    ids
  }
})

export const updateSelectedModelConfigs = (
  ids: ConfigId[]
): UpdateSelectedModelConfigsAction => ({
  type: 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  payload: {
    ids
  }
})

export const clearSelectedModelConfigs = (): UpdateSelectedModelConfigsAction => ({
  type: 'MODEL.UPDATE_SELECTED_MODEL_CONFIGS',
  payload: {
    ids: []
  }
})

export const updateQuantities = (
  ids: ConfigId[],
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
