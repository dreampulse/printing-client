import range from 'lodash/range'
import flatMap from 'lodash/flatMap'
import * as modelAction from '../src/app/action-next/model'
import reducer from '../src/app/reducer'
import getUploadModelMock from './mock/printing-engine/backend-model'
import getFileMock from './mock/file'

const uploadSomeFilesActions = id => {
  const uploadFileAction = modelAction.uploadFile(getFileMock())
  uploadFileAction.payload.fileId = `file-id-${id}`
  uploadFileAction.payload.configId = `config-id-${id}`
  const uploadCompleteAction = modelAction.uploadComplete(
    `file-id-${id}`,
    getUploadModelMock({modelId: `model-id-${id}`})
  )

  return [uploadFileAction, uploadCompleteAction]
}

export const withNUploadedModels = (n = 1) => {
  const actions = flatMap(range(n).map(i => uploadSomeFilesActions(i + 1)))

  const state = actions.reduce(
    (currentState, action) => reducer(getModel(currentState), action),
    undefined
  )

  return state
}
