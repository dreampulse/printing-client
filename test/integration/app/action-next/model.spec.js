import {Cmd} from 'redux-loop'
import * as modelAction from '../../../../src/app/action-next/model'
import {selectModelsOfModelConfigs, selectModelConfigs} from '../../../../src/app/selector'
import {uploadModel} from '../../../../src/app/service/printing-engine'

import reducer from '../../../../src/app/reducer'
import {withOneUploadedModel} from '../../../scenario'
import getBackendModelMock from '../../../mock/printing-engine/backend-model'
import getFileMock from '../../../mock/file'

describe('model action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('uploadFile()', () => {
    let uploadFileAction
    let state

    beforeEach(() => {
      uploadFileAction = modelAction.uploadFile(getFileMock())
      state = reducer(undefined, uploadFileAction)
    })

    it('creates unique configIds', () => {
      const uploadFileAction1 = modelAction.uploadFile(getFileMock())
      const uploadFileAction2 = modelAction.uploadFile(getFileMock())

      expect(uploadFileAction1.payload.configId, 'not to equal', uploadFileAction2.payload.configId)
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('contains the uploaded file', () => {
        expect(selectModelsOfModelConfigs(getModel(state)), 'to have an item satisfying', {
          configId: expect.it('to be a', 'string'),
          fileName: 'some-file-name',
          fileSize: 42,
          progress: 0,
          error: false
        })
      })
    })

    describe('using selectModelConfigs() selector', () => {
      it('contains a model uploading config', () => {
        expect(selectModelConfigs(getModel(state)), 'to have an item satisfying', {
          id: expect.it('to be a', 'string'),
          type: 'UPLOADING'
        })
      })
    })

    it('triggers the modelAction.uploadProgress() action as soon as uploadModel() has a progress', () => {
      const uploadModelCmd = findCmd(state, uploadModel)
      const onProgress = uploadModelCmd.args[2]

      sandbox.spy(Cmd, 'dispatch')
      onProgress(30)

      expect(Cmd.dispatch, 'to have a call satisfying', [
        modelAction.uploadProgress(uploadFileAction.payload.configId, 30)
      ])
    })

    it('triggers the modelAction.uploadComplete() action with the configId and the result from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel, [
        getFileMock,
        {unit: 'mm'},
        expect.it('to be a', 'function')
      ])
      const action = cmd.simulate({success: true, result: getBackendModelMock({})})

      expect(
        action,
        'to equal',
        modelAction.uploadComplete(uploadFileAction.payload.configId, getBackendModelMock({}))
      )
    })

    it('triggers the modelAction.uploadFail() action with the configId and the error from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel)
      const action = cmd.simulate({success: false, result: getBackendModelMock({})})

      expect(
        action,
        'to equal',
        modelAction.uploadFail(uploadFileAction.payload.configId, getBackendModelMock({}))
      )
    })
  })

  describe('uploadProgress()', () => {
    let configId
    let state

    beforeEach(() => {
      const uploadFileAction = modelAction.uploadFile(getFileMock())
      configId = uploadFileAction.payload.configId
      const uploadProgressAction = modelAction.uploadProgress(configId, 42)

      const stateBeforeUploadProgress = reducer(undefined, uploadFileAction)
      state = reducer(getModel(stateBeforeUploadProgress), uploadProgressAction)
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('updates the model with the given configId', () => {
        const model = selectModelsOfModelConfigs(getModel(state)).find(m => m.configId === configId)

        expect(model, 'to satisfy', {progress: 42})
      })
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = modelAction.uploadFile(getFileMock())
        const uploadFileAction2 = modelAction.uploadFile(getFileMock())
        const uploadFileAction3 = modelAction.uploadFile(getFileMock())
        const fileId2 = uploadFileAction2.payload.configId

        const stateBefore = [uploadFileAction1, uploadFileAction2, uploadFileAction3].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
        const orderBeforeDispatch = selectModelConfigs(getModel(stateBefore)).map(m => m.id)

        const stateAfterUploadProgress = reducer(
          getModel(stateBefore),
          modelAction.uploadProgress(fileId2, 42)
        )
        const orderAfterDispatch = selectModelConfigs(getModel(stateAfterUploadProgress)).map(
          m => m.id
        )

        expect(orderBeforeDispatch, 'to equal', orderAfterDispatch)
      })
    })

    it('triggers the modelAction.uploadProgress() action as soon as uploadModel() has a progress', () => {
      const uploadModelCmd = findCmd(state, uploadModel)
      const onProgress = uploadModelCmd.args[2]

      sandbox.spy(Cmd, 'dispatch')
      onProgress(30)

      expect(Cmd.dispatch, 'to have a call satisfying', [modelAction.uploadProgress(configId, 30)])
    })

    it('triggers the modelAction.uploadComplete() action with the configId and the result from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel, [
        getFileMock,
        {unit: 'mm'},
        expect.it('to be a', 'function')
      ])
      const action = cmd.simulate({success: true, result: getBackendModelMock({})})

      expect(action, 'to equal', modelAction.uploadComplete(configId, getBackendModelMock({})))
    })

    it('triggers the modelAction.uploadFail() action with the file id and the error from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel)
      const action = cmd.simulate({success: false, result: getBackendModelMock({})})

      expect(action, 'to equal', modelAction.uploadFail(configId, getBackendModelMock({})))
    })
  })

  describe('uploadComplete()', () => {
    let state

    beforeEach(() => {
      state = withOneUploadedModel()
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('returns the given backend model with a quantity property', () => {
        const model = selectModelsOfModelConfigs(getModel(state)).find(
          m => m.modelId === 'model-id-1'
        )

        expect(model, 'to satisfy', getBackendModelMock({modelId: 'model-id-1'}))
      })
    })

    describe('using selectModelConfigs() selector', () => {
      it('returns the model config item containing the model', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to have an item satisfying', {
          type: 'UPLOADED',
          quantity: 1,
          modelId: 'model-id-1',
          id: expect.it('to be a', 'string'),
          quoteId: null,
          shippingId: null
        })
      })
    })
  })

  describe('uploadFail()', () => {
    let configId
    let error
    let state

    beforeEach(() => {
      const uploadFileAction = modelAction.uploadFile(getFileMock())
      error = new Error('Some error')
      configId = uploadFileAction.payload.configId
      const uploadFailAction = modelAction.uploadFail(configId, error)

      state = [uploadFileAction, uploadFailAction].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('contains the uploading model with an error flag and errorMessage', () => {
        const model = selectModelsOfModelConfigs(getModel(state)).find(m => m.configId === configId)

        expect(model, 'to satisfy', {
          error: true,
          errorMessage: error.message
        })
      })
    })
  })
})
