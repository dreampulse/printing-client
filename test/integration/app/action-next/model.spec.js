import {Cmd} from 'redux-loop'
import * as modelAction from '../../../../src/app/action-next/model'
import {
  selectModelsOfModelConfigs,
  selectModelConfigs,
  selectSelectedModelConfigIds,
  selectSelectedModelConfigs
} from '../../../../src/app/selector'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

import reducer from '../../../../src/app/reducer-next'
import {withNUploadedModels} from '../../../scenario'
import getBackendModelMock from '../../../mock/printing-engine/backend-model'
import getFileMock from '../../../mock/file'
import getFileListMock from '../../../mock/file-list'

describe('model', () => {
  describe('action.uploadFile()', () => {
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

    it('calls printingEngine.uploadModel() with the correct arguments', () => {
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

    describe('selector.selectModelsOfModelConfigs()', () => {
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

    describe('selector.selectModelConfigs()', () => {
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

  describe('action.uploadFiles()', () => {
    let file1
    let file2
    let uploadFilesAction

    beforeEach(() => {
      file1 = getFileMock()
    })

    describe('when passed in an array with just one file', () => {
      beforeEach(() => {
        uploadFilesAction = modelAction.uploadFiles(getFileListMock([file1]))
      })

      it('should return the same as modelAction.uploadFile()', () => {
        const uploadFileAction = modelAction.uploadFile(file1)

        uploadFileAction.payload.fileId = expect.it('to be a string')
        uploadFileAction.payload.configId = expect.it('to be a string')

        expect(uploadFilesAction, 'to satisfy', uploadFileAction)
      })
    })

    describe('when passed in an array with multiple files', () => {
      let state

      beforeEach(() => {
        file2 = getFileMock()
        uploadFilesAction = modelAction.uploadFiles(getFileListMock([file1, file2]))
        state = reducer(undefined, uploadFilesAction)
      })

      it('does not change the state', () => {
        const someInitAction = {}
        const stateBefore = getModel(reducer(undefined, someInitAction))
        const stateAfter = getModel(reducer(stateBefore, uploadFilesAction))

        expect(stateBefore, 'to be', stateAfter)
      })

      it('triggers modelAction.uploadFile() for each file', () => {
        const uploadFileAction1 = modelAction.uploadFile(file1)
        const uploadFileAction2 = modelAction.uploadFile(file2)

        uploadFileAction1.payload.fileId = expect.it('to be a string')
        uploadFileAction1.payload.configId = expect.it('to be a string')
        uploadFileAction2.payload.fileId = expect.it('to be a string')
        uploadFileAction2.payload.configId = expect.it('to be a string')

        expect(
          findCmd(state, Cmd.list([Cmd.action(uploadFileAction1), Cmd.action(uploadFileAction2)])),
          'to be truthy'
        )
      })
    })
  })

  describe('action.uploadProgress()', () => {
    let fileId
    let state

    beforeEach(() => {
      const uploadFileAction = modelAction.uploadFile(getFileMock())
      fileId = uploadFileAction.payload.fileId
      const uploadProgressAction = modelAction.uploadProgress(fileId, 42)

      const stateBeforeUploadProgress = reducer(undefined, uploadFileAction)
      state = reducer(getModel(stateBeforeUploadProgress), uploadProgressAction)
    })

    describe('selector.selectModelsOfModelConfigs()', () => {
      it('updates the model with the given fileId', () => {
        const models = selectModelsOfModelConfigs(getModel(state))
        expect(models, 'to have an item satisfying', {progress: 42})
      })
    })

    describe('selector.selectModelConfigs()', () => {
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

  describe('action.uploadComplete()', () => {
    let state

    beforeEach(() => {
      // Upload two files -> This tests the behavior if one file is already uploaded
      state = withNUploadedModels(2)
    })

    describe('selector.selectModelConfigs()', () => {
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

    describe('selector.selectModelsOfModelConfigs()', () => {
      it('returns the given backend model with a quantity property', () => {
        const model = selectModelsOfModelConfigs(getModel(state)).find(
          m => m.modelId === 'model-id-1'
        )

        expect(model, 'to satisfy', getBackendModelMock({modelId: 'model-id-1'}))
      })
    })

    describe('selector.selectModelConfigs()', () => {
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

  describe('action.uploadFail()', () => {
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

    describe('selector.selectModelsOfModelConfigs()', () => {
      it('contains the uploading model with an error flag and errorMessage', () => {
        const model = selectModelsOfModelConfigs(getModel(state))

        expect(model, 'to have an item satisfying', {
          error: true,
          errorMessage: error.message
        })
      })
    })
  })

  describe('action.deleteModelConfigs()', () => {
    let action
    let stateBefore

    beforeEach(() => {
      action = modelAction.deleteModelConfigs(['config-id-2', 'config-id-3'])
      stateBefore = withNUploadedModels(3)
    })

    describe('selector.selectModelConfigs()', () => {
      it('deletes given model configs', () => {
        const state = reducer(getModel(stateBefore), action)

        const modelConfigsBefore = selectModelConfigs(getModel(stateBefore))
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to equal', [modelConfigsBefore[0]])
      })
    })

    describe('selector.selectSelectedModelConfigIds()', () => {
      it('deletes given model configs from selected model configs', () => {
        const selectAction = modelAction.updateSelectedModelConfigs(['config-id-1', 'config-id-2'])
        let state = reducer(getModel(stateBefore), selectAction)
        state = reducer(getModel(state), action)

        const ids = selectSelectedModelConfigIds(getModel(state))
        expect(ids, 'to equal', ['config-id-1'])
      })
    })
  })

  describe('action.updateSelectedModelConfigs()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.updateSelectedModelConfigs(['config-id-1'])
      state = reducer(getModel(withNUploadedModels(1)), action)
    })

    describe('selector.selectSelectedModelConfigIds()', () => {
      it('selects given model config', () => {
        const ids = selectSelectedModelConfigIds(getModel(state))
        expect(ids, 'to equal', ['config-id-1'])
      })
    })

    describe('selector.selectSelectedModelConfig()', () => {
      it('selects given model config', () => {
        const modelConfigs = selectSelectedModelConfigs(getModel(state))
        expect(modelConfigs, 'to have an item satisfying', {
          id: 'config-id-1'
        })
      })
    })
  })

  describe('action.updateQuantities()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.updateQuantities(['config-id-1'], 123)
      state = reducer(getModel(withNUploadedModels(2)), action)
    })

    describe('selector.selectModelConfigs()', () => {
      it('has model config with updated quantity', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs, 'to have an item satisfying', {
          id: 'config-id-1',
          quantity: 123
        })
      })
    })
  })

  describe('action.duplicateModelConfig()', () => {
    let action
    let state

    beforeEach(() => {
      action = modelAction.duplicateModelConfig('config-id-1')
      state = reducer(getModel(withNUploadedModels(2)), action)
    })

    describe('selector.selectModelConfigs()', () => {
      it('contains the duplicated model config just before the original model config', () => {
        const modelConfigs = selectModelConfigs(getModel(state))
        expect(modelConfigs[1], 'to satisfy', {
          id: action.payload.nextId
        })
      })

      it('contains the duplicated model config', () => {
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
