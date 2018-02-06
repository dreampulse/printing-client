import {Cmd} from 'redux-loop'
import * as modelAction from '../../../../src/app/action-next/model'
import {
  selectUploadingFiles,
  selectModels,
  selectBasketItems,
  selectSelectedModelConfigs,
  selectModelConfigs
} from '../../../../src/app/selector'
import {uploadModel} from '../../../../src/app/service/printing-engine'

import reducer from '../../../../src/app/reducer'
import {withOneUploadedModel} from '../../../scenario'
import getUploadModelMock from '../../../mock/printing-engine/upload-model'
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

    it('creates unique fileIds', () => {
      const uploadFileAction1 = modelAction.uploadFile(getFileMock())
      const uploadFileAction2 = modelAction.uploadFile(getFileMock())

      expect(uploadFileAction1.payload.fileId, 'not to equal', uploadFileAction2.payload.fileId)
    })

    describe('using selectUploadingFiles() selector', () => {
      it('contains the uploaded file', () => {
        expect(selectUploadingFiles(getModel(state)), 'to have an item satisfying', {
          fileId: expect.it('to be a', 'string'),
          fileName: 'some-file-name',
          fileSize: 42,
          progress: 0,
          error: false
        })
      })
    })

    it('triggers the modelAction.uploadProgress() action as soon as uploadModel() has a progress', () => {
      const uploadModelCmd = findCmd(state, uploadModel)
      const onProgress = uploadModelCmd.args[2]

      sandbox.spy(Cmd, 'dispatch')
      onProgress(30)

      expect(Cmd.dispatch, 'to have a call satisfying', [
        modelAction.uploadProgress(uploadFileAction.payload.fileId, 30)
      ])
    })

    it('triggers the modelAction.uploadComplete() action with the file id and the result from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel, [
        getFileMock,
        {unit: 'mm'},
        expect.it('to be a', 'function')
      ])
      const action = cmd.simulate({success: true, result: getUploadModelMock()})

      expect(
        action,
        'to equal',
        modelAction.uploadComplete(uploadFileAction.payload.fileId, getUploadModelMock())
      )
    })

    it('triggers the modelAction.uploadFail() action with the file id and the error from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel)
      const action = cmd.simulate({success: false, result: getUploadModelMock()})

      expect(
        action,
        'to equal',
        modelAction.uploadFail(uploadFileAction.payload.fileId, getUploadModelMock())
      )
    })

    describe('using selectBasketItems() selector', () => {
      it('does not add an item into the basket', () => {
        expect(selectBasketItems(getModel(state)), 'to equal', [])
      })
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

    describe('using selectUploadingFiles() selector', () => {
      it('updates the model with the given file id', () => {
        const model = selectUploadingFiles(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {progress: 42})
      })

      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = modelAction.uploadFile(getFileMock())
        const uploadFileAction2 = modelAction.uploadFile(getFileMock())
        const uploadFileAction3 = modelAction.uploadFile(getFileMock())
        const fileId2 = uploadFileAction2.payload.fileId

        const stateBefore = [uploadFileAction1, uploadFileAction2, uploadFileAction3].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
        const orderBeforeDispatch = selectUploadingFiles(getModel(stateBefore)).map(m => m.fileId)

        const stateAfterUploadProgress = reducer(
          getModel(stateBefore),
          modelAction.uploadProgress(fileId2, 42)
        )
        const orderAfterDispatch = selectUploadingFiles(getModel(stateAfterUploadProgress)).map(
          m => m.fileId
        )

        expect(orderBeforeDispatch, 'to equal', orderAfterDispatch)
      })
    })

    it('triggers the modelAction.uploadProgress() action as soon as uploadModel() has a progress', () => {
      const uploadModelCmd = findCmd(state, uploadModel)
      const onProgress = uploadModelCmd.args[2]

      sandbox.spy(Cmd, 'dispatch')
      onProgress(30)

      expect(Cmd.dispatch, 'to have a call satisfying', [modelAction.uploadProgress(fileId, 30)])
    })

    it('triggers the modelAction.uploadComplete() action with the file id and the result from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel, [
        getFileMock,
        {unit: 'mm'},
        expect.it('to be a', 'function')
      ])
      const action = cmd.simulate({success: true, result: getUploadModelMock()})

      expect(action, 'to equal', modelAction.uploadComplete(fileId, getUploadModelMock()))
    })

    it('triggers the modelAction.uploadFail() action with the file id and the error from uploadModel()', () => {
      const cmd = findCmd(state, uploadModel)
      const action = cmd.simulate({success: false, result: getUploadModelMock()})

      expect(action, 'to equal', modelAction.uploadFail(fileId, getUploadModelMock()))
    })
  })

  describe('uploadComplete()', () => {
    let fileId
    let state

    beforeEach(() => {
      state = withOneUploadedModel()
    })

    describe('using selectUploadingFiles() selector', () => {
      it('does not return the file anymore', () => {
        const model = selectUploadingFiles(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to be', undefined)
      })
    })

    describe('using selectModels() selector', () => {
      it('returns the given backend model with a quantity property', () => {
        const model = selectModels(getModel(state)).find(
          m => m.modelId === getUploadModelMock().modelId
        )

        expect(model, 'to satisfy', getUploadModelMock())
      })
    })

    describe('using selectBasketItems() selector', () => {
      it('returns the basket items containing the model', () => {
        const basketItems = selectBasketItems(getModel(state))
        const model = selectModels(getModel(state))[0]
        expect(basketItems, 'to equal', [
          {
            id: 0, // The id is the index of the array
            modelId: 'some-model-id',
            quantity: 1,
            material: null,
            model
          }
        ])
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

    describe('using selectUploadingModels() selector', () => {
      it('contains the uploading model with an error flag and errorMessage', () => {
        const model = selectUploadingFiles(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {
          error: true,
          errorMessage: error.message
        })
      })
    })
  })

  describe('deleteModelConfigs()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.deleteModelConfigs(['model-id-1'])
      state = reducer(getModel(withOneUploadedModel()), action)
    })

    describe('using selectModels() selector', () => {
      it('does not contain the model anymore', () => {
        const models = selectModels(getModel(state))
        expect(models, 'to equal', [])
      })
    })

    it('deletes given model config', () => {
      const modelConfigs = selectModelConfigs(getModel(state))
      expect(modelConfigs, 'to equal', [])
    })
  })

  describe('updateSelectedModelConfigs()', () => {
    let state

    beforeEach(() => {
      const action = modelAction.updateSelectedModelConfigs(['some-model-id'])
      state = reducer(getModel(withOneUploadedModel()), action)
    })

    it('does not contain the model any more', () => {
      const models = selectModels(getModel(state))
      expect(models, 'to equal', [])
    })
  })
})
