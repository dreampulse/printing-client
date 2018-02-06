// @flow

import uniqueId from 'lodash/uniqueId'
import type {Action, BackendModel, ConfigId} from '../type-next'

type UploadFileAction = Action<'MODEL.UPLOAD_FILE', {configId: ConfigId, file: File}>
type UploadProgressAction = Action<'MODEL.UPLOAD_PROGRESS', {configId: ConfigId, progress: number}>
type UploadCompleteAction = Action<
  'MODEL.UPLOAD_COMPLETE',
  {configId: ConfigId, model: BackendModel}
>
type UploadFailAction = Action<'MODEL.UPLOAD_FAIL', {configId: ConfigId, error: Error}>

export type ModelAction =
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'MODEL.UPLOAD_FILE',
  payload: {
    file,
    configId: uniqueId('config-id-')
  }
})

export const uploadProgress = (configId: ConfigId, progress: number): UploadProgressAction => ({
  type: 'MODEL.UPLOAD_PROGRESS',
  payload: {progress, configId}
})

export const uploadComplete = (configId: ConfigId, model: BackendModel): UploadCompleteAction => ({
  type: 'MODEL.UPLOAD_COMPLETE',
  payload: {configId, model}
})

export const uploadFail = (configId: ConfigId, error: Error): UploadFailAction => ({
  type: 'MODEL.UPLOAD_FAIL',
  payload: {
    configId,
    error
  }
})
