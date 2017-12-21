import * as modelAction from '../src/app/action-next/model'
import reducer from '../src/app/reducer'
import getUploadModelMock from './mock/printing-engine/upload-model'
import getFileMock from './mock/file'

export const withOneUploadedModel = () => {
  const uploadFileAction = modelAction.uploadFile(getFileMock())
  const fileId = uploadFileAction.payload.fileId
  const uploadCompleteAction = modelAction.uploadComplete(fileId, getUploadModelMock())

  const state = [uploadFileAction, uploadCompleteAction].reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
