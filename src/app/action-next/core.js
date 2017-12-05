// @flow

import type {Action, MaterialGroup, BackendModel} from '../type-next'

type UpdateMaterialGroupsAction = Action<'CORE.UPDATE_MATERIAL_GROUPS', Array<MaterialGroup>>
type UploadFileAction = Action<'CORE.UPLOAD_FILE', File>
type UploadProgressAction = Action<'CORE.UPLOAD_PROGRESS', {fileId: string, progress: number}>
type UploadCompleteAction = Action<'CORE.UPLOAD_COMPLETE', {fileId: string, model: BackendModel}>
type UploadFailAction = Action<'CORE.UPLOAD_FAIL', {fileId: string, error: Error}>

export type CoreAction =
  | UpdateMaterialGroupsAction
  | UploadFileAction
  | UploadProgressAction
  | UploadCompleteAction
  | UploadFailAction

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

export const uploadProgress = (fileId: string, progress: number): UploadProgressAction => ({
  type: 'CORE.UPLOAD_PROGRESS',
  payload: {progress, fileId}
})

export const uploadComplete = (fileId: string, model: BackendModel): UploadCompleteAction => ({
  type: 'CORE.UPLOAD_COMPLETE',
  payload: {
    fileId,
    model
  }
})

export const uploadFail = (fileId: string, error: Error): UploadFailAction => ({
  type: 'CORE.UPLOAD_FAIL',
  payload: {
    fileId,
    error
  }
})
