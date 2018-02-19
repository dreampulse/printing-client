import {Cmd} from 'redux-loop'
import * as modelAction from '../../../../src/app/action-next/model'
import {
  selectModelsOfModelConfigs,
  selectModelConfigs,
  selectSelectedModelConfigIds,
  selectSelectedModelConfigs
} from '../../../../src/app/selector'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

import reducer from '../../../../src/app/reducer'
import {withNUploadedModels} from '../../../scenario'
import getBackendModelMock from '../../../mock/printing-engine/backend-model'
import getFileMock from '../../../mock/file'

describe('model action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    sandbox.stub(printingEngine, 'uploadModel')
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('uploadFile()', () => {
    let fileId
    let configId
    let uploadFileAction
    let state

    beforeEach(() => {
      uploadFileAction = modelAction.uploadFile(getFileMock())
      fileId = uploadFileAction.payload.fileId
      configId = uploadFileAction.payload.configId
      state = reducer(undefined, uploadFileAction)
    })

    it('creates unique fileIds', () => {
      const uploadFileAction1 = modelAction.uploadFile(getFileMock())
      const uploadFileAction2 = modelAction.uploadFile(getFileMock())

      expect(uploadFileAction1.payload.fileId, 'not to equal', uploadFileAction2.payload.fileId)
    })

    it('uses the correct upload progress action creator (the 4th parameter)', () => {
      const cmd = findCmd(state, printingEngine.uploadModel, [
        getFileMock,
        {unit: 'mm'},
        Cmd.dispatch,
        expect.it('to be a', 'function')
      ])

      const onProgress = cmd.args[3]

      expect(onProgress('some-progress'), 'to satisfy', {
        type: 'MODEL.UPLOAD_PROGRESS',
        payload: {progress: 'some-progress', fileId: expect.it('to be a string')}
      })
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('contains the uploaded file', () => {
        expect(selectModelsOfModelConfigs(getModel(state)), 'to have an item satisfying', {
          fileId,
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
          id: configId,
          type: 'UPLOADING'
        })
      })
    })

    it('triggers the modelAction.uploadComplete() action with the fileId and the result from uploadModel()', () => {
      const cmd = findCmd(state, printingEngine.uploadModel, [
        getFileMock,
        {unit: 'mm'},
        Cmd.dispatch,
        expect.it('to be a', 'function')
      ])
      const action = cmd.simulate({success: true, result: getBackendModelMock({})})

      expect(
        action,
        'to equal',
        modelAction.uploadComplete(uploadFileAction.payload.fileId, getBackendModelMock({}))
      )
    })

    it('triggers the modelAction.uploadFail() action with the fileId and the error from uploadModel()', () => {
      const cmd = findCmd(state, printingEngine.uploadModel)
      const action = cmd.simulate({success: false, result: getBackendModelMock({})})

      expect(
        action,
        'to equal',
        modelAction.uploadFail(uploadFileAction.payload.fileId, getBackendModelMock({}))
      )
    })
  })

  describe('uploadProgress()', () => {
    let fileId
    let state

    beforeEach(() => {
      const uploadFileAction = modelAction.uploadFile(getFileMock())
      fileId = uploadFileAction.payload.fileId
      const uploadProgressAction = modelAction.uploadProgress(fileId, 42)

      const stateBeforeUploadProgress = reducer(undefined, uploadFileAction)
      state = reducer(getModel(stateBeforeUploadProgress), uploadProgressAction)
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('updates the model with the given fileId', () => {
        const models = selectModelsOfModelConfigs(getModel(state))
        expect(models, 'to have an item satisfying', {progress: 42})
      })
    })

    describe('using selectModelConfigs() selector', () => {
      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = modelAction.uploadFile(getFileMock())
        const uploadFileAction2 = modelAction.uploadFile(getFileMock())
        const uploadFileAction3 = modelAction.uploadFile(getFileMock())
        const fileId2 = uploadFileAction2.payload.fileId

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
  })

  describe('uploadComplete()', () => {
    let state

    beforeEach(() => {
      // Upload two files -> This tests the behavior if one file is already uploaded
      state = withNUploadedModels(2)
    })

    describe('using selectModelConfigs() selector', () => {
      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = modelAction.uploadFile(getFileMock())
        const uploadFileAction2 = modelAction.uploadFile(getFileMock())
        const uploadFileAction3 = modelAction.uploadFile(getFileMock())
        const fileId2 = uploadFileAction2.payload.fileId

        const stateBefore = [uploadFileAction1, uploadFileAction2, uploadFileAction3].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )

        const orderBeforeDispatch = selectModelConfigs(getModel(stateBefore)).map(m => m.id)

        const stateAfterUploadProgress = reducer(
          getModel(stateBefore),
          modelAction.uploadComplete(fileId2, getBackendModelMock({}))
        )

        const orderAfterDispatch = selectModelConfigs(getModel(stateAfterUploadProgress)).map(
          m => m.id
        )

        expect(orderBeforeDispatch, 'to equal', orderAfterDispatch)
      })
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
          id: 'config-id-1',
          quoteId: null,
          shippingId: null
        })
      })
    })
  })

  describe('uploadFail()', () => {
    let fileId
    let error
    let state

    beforeEach(() => {
      const uploadFileAction = modelAction.uploadFile(getFileMock())
      error = new Error('Some error')
      fileId = uploadFileAction.payload.fileId
      const uploadFailAction = modelAction.uploadFail(fileId, error)

      state = [uploadFileAction, uploadFailAction].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    describe('using selectModelsOfModelConfigs() selector', () => {
      it('contains the uploading model with an error flag and errorMessage', () => {
        const model = selectModelsOfModelConfigs(getModel(state))

        expect(model, 'to have an item satisfying', {
          error: true,
          errorMessage: error.message
        })
      })
    })
  })

  describe('deleteModelConfigs()', () => {
    let action
    let stateBefore

    beforeEach(() => {
      action = modelAction.deleteModelConfigs(['config-id-2', 'config-id-3'])
      stateBefore = withNUploadedModels(3)
    })

    describe('using selectModelConfigs() selector', () => {
      it('deletes given model configs', () => {
        const state = reducer(getModel(stateBefore), action)

        const modelConfigsBefore = selectModelConfigs(getModel(stateBefore))
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to equal', [modelConfigsBefore[0]])
      })
    })

    describe('using selectSelectedModelConfigIds() selector', () => {
      it('deletes given model configs from selected model configs', () => {
        const selectAction = modelAction.updateSelectedModelConfigs(['config-id-1', 'config-id-2'])
        let state = reducer(getModel(stateBefore), selectAction)
        state = reducer(getModel(state), action)

        const ids = selectSelectedModelConfigIds(getModel(state))
        expect(ids, 'to equal', ['config-id-1'])
      })
    })
  })

  describe('updateSelectedModelConfigs()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.updateSelectedModelConfigs(['config-id-1'])
      state = reducer(getModel(withNUploadedModels(1)), action)
    })

    describe('using selectSelectedModelConfigIds() selector', () => {
      it('selects given model config', () => {
        const ids = selectSelectedModelConfigIds(getModel(state))
        expect(ids, 'to equal', ['config-id-1'])
      })
    })

    describe('using selectSelectedModelConfig() selector', () => {
      it('selects given model config', () => {
        const modelConfigs = selectSelectedModelConfigs(getModel(state))
        expect(modelConfigs, 'to equal', selectSelectedModelConfigs(getModel(state)))
      })
    })
  })

  describe('updateQuantities()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.updateQuantities(['config-id-1'], 123)
      state = reducer(getModel(withNUploadedModels(2)), action)
    })

    describe('using selectModelConfigs() selector', () => {
      it('has model config with updated quantity', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to have an item satisfying', {
          id: 'config-id-1',
          quantity: 123
        })
      })
    })
  })

  describe('duplicateModelConfig()', () => {
    let action
    let state

    beforeEach(() => {
      action = modelAction.duplicateModelConfig('config-id-1')
      state = reducer(getModel(withNUploadedModels(2)), action)
    })

    describe('using selectModelConfigs() selector', () => {
      it('has appends new model config after orignal model config', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs[1], 'to satisfy', {
          id: action.payload.nextId
        })
      })

      it('has appends new model config after orignal model config', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to have an item satisfying', {
          id: action.payload.nextId,
          type: 'UPLOADED',
          quantity: 1,
          modelId: 'model-id-1',
          quoteId: null,
          shippingId: null
        })
      })
    })
  })
})
