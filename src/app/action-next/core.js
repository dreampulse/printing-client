// @flow

import type {Action, MaterialGroup, BackendModel} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
type UploadFileAction = Action<'CORE.UPLOAD_FILE', File>
type UploadProgressedAction = Action<'CORE.UPLOAD_PROGRESSED', {fileId: string, progress: number}>
type UploadCompletedAction = Action<'CORE.UPLOAD_COMPLETED', {fileId: string, model: BackendModel}>
type UploadFailedAction = Action<'CORE.UPLOAD_FAILED', {fileId: string, error: Error}>

export type CoreAction =
  | UpdateMaterialGroupsAction
  | UploadFileAction
  | UploadCompletedAction
  | UploadFailedAction

export const updateMaterialGroups = (
  materialGroups: Array<MaterialGroup>
): UpdateMaterialGroupsAction => ({
  type: 'CORE.UPDATE_MATERIAL_GROUPS',
  payload: materialGroups
})

export const uploadFile = (file: File): UploadFileAction => ({
  type: 'CORE.UPLOAD_FILE',
  payload: file
})

// gegenwart
export const uploadProgressed = (fileId: string, progress: number): UploadProgressedAction => ({
  type: 'CORE.UPLOAD_PROGRESSED',
  payload: {progress, fileId}
})

export const uploadCompleted = (fileId: string, model: BackendModel): UploadCompletedAction => ({
  type: 'CORE.UPLOAD_COMPLETED',
  payload: {
    fileId,
    model
  }
})

export const uploadFailed = (fileId: string, error: Error): UploadFailedAction => ({
  type: 'CORE.UPLOAD_FAILED',
  payload: {
    fileId,
    error
  }
})
