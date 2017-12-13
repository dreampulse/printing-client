import * as core from 'App/action-next/core'
import reducer from 'App/reducer-next'
import uploadModelMock from './mock/printing-engine/upload-model'
import fileMock from './mock/file'

export const withOneUploadedModel = () => {
  const uploadFileAction = core.uploadFile(fileMock())
  const fileId = uploadFileAction.payload.fileId
  const uploadCompleteAction = core.uploadComplete(fileId, uploadModelMock())

  const state = [uploadFileAction, uploadCompleteAction].reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
