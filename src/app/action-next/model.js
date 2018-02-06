// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, BackendModel, ConfigId, FileId} from '../type-next'

type UploadFileAction = Action<
  'MODEL.UPLOAD_FILE',
  {fileId: FileId, configId: ConfigId, file: File}
>
type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {fileId: FileId, progress: number}>
type UploadCompleteAction = Action<'MODEL.UPLOAD_COMPLETE', {fileId: FileId, model: BackendModel}>
type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {fileId: FileId, error: Error}>

export type ModelAction =
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction

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
