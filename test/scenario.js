import * as modelAction from '../src/app/action-next/model'
import reducer from '../src/app/reducer'
import getUploadModelMock from './mock/printing-engine/backend-model'
import getFileMock from './mock/file'

export const withOneUploadedModel = () => {
  const uploadFileAction = modelAction.uploadFile(getFileMock())
  const configId = uploadFileAction.payload.configId
  const uploadCompleteAction = modelAction.uploadComplete(
    configId,
    getUploadModelMock({modelId: 'model-id-1'})
  )

  const state = [uploadFileAction, uploadCompleteAction].reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
