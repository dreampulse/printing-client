import * as core from 'App/action-next/core'
import reducer from 'App/reducer'
import getUploadModelMock from './mock/printing-engine/upload-model'
import getFileMock from './mock/file'

export const withOneUploadedModel = () => {
  const uploadFileAction = core.uploadFile(getFileMock())
  const fileId = uploadFileAction.payload.fileId
  const uploadCompleteAction = core.uploadComplete(fileId, getUploadModelMock())

  const state = [uploadFileAction, uploadCompleteAction].reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
