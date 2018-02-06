import * as modelAction from '../src/app/action-next/model'
import reducer from '../src/app/reducer'
import getUploadModelMock from './mock/printing-engine/backend-model'
import getFileMock from './mock/file'

export const withOneUploadedModel = () => {
  const uploadFileAction = modelAction.uploadFile(getFileMock())
  uploadFileAction.payload.fileId = 'some-file-id'
  uploadFileAction.payload.configId = 'some-config-id'
  const uploadCompleteAction = modelAction.uploadComplete(
    'some-file-id',
    getUploadModelMock({modelId: 'model-id-1'})
  )

  const state = [uploadFileAction, uploadCompleteAction].reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
