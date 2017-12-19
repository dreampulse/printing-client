import {Cmd} from 'redux-loop'
import * as core from 'App/action-next/core'
import {selectMaterialGroups, selectUploadingModels, selectModels} from 'App/selector'
import {uploadModel} from 'App/lib/printing-engine'
import reducer from 'App/reducer'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import uploadModelMock from '../../../mock/printing-engine/upload-model'
import fileMock from '../../../mock/file'

describe('core action', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  describe('updateMaterialGroups()', () => {
    let materialGroups
    let state

    beforeEach(() => {
      materialGroups = materialListResponse.materialStructure
      state = reducer(undefined, core.updateMaterialGroups(materialGroups))
    })

    it('assigns material ids to all material groups', () => {
      const action = core.updateMaterialGroups(materialListResponse.materialStructure)

      expect(action.payload.every(material => 'id' in material), 'to be', true)
    })

    describe('using selectMaterialGroups() selector', () => {
      it('returns the updated material group', () =>
        expect(
          selectMaterialGroups(getModel(state)),
          'to satisfy',
          materialListResponse.materialStructure
        ))
    })
  })

  describe('uploadFile()', () => {
    let uploadFileAction
    let state

    beforeEach(() => {
      uploadFileAction = core.uploadFile(fileMock())
      state = reducer(undefined, uploadFileAction)
    })

    it('creates unique fileIds', () => {
      const uploadFileAction1 = core.uploadFile(fileMock())
      const uploadFileAction2 = core.uploadFile(fileMock())

      expect(uploadFileAction1.payload.fileId, 'not to equal', uploadFileAction2.payload.fileId)
    })

    describe('using selectUploadingModels() selector', () => {
      it('returns the uploaded models', () => {
        expect(selectUploadingModels(getModel(state)), 'to have an item satisfying', {
          fileId: expect.it('to be a', 'string'),
          fileName: 'some-file-name',
          fileSize: 42,
          progress: 0,
          error: false
        })
      })

      it('triggers the core.uploadProgress() action as soon as uploadModel() has a progress', () => {
        const uploadModelCmd = findCmd(state, uploadModel)
        const onProgress = uploadModelCmd.args[2]

        sandbox.spy(Cmd, 'dispatch')
        onProgress(30)

        expect(Cmd.dispatch, 'to have a call satisfying', [
          core.uploadProgress(uploadFileAction.payload.fileId, 30)
        ])
      })

      it('triggers the core.uploadComplete() action with the file id and the result from uploadModel()', () => {
        const cmd = findCmd(state, uploadModel, [
          fileMock,
          {unit: 'mm'},
          expect.it('to be a', 'function')
        ])
        const action = cmd.simulate({success: true, result: uploadModelMock})

        expect(
          action,
          'to equal',
          core.uploadComplete(uploadFileAction.payload.fileId, uploadModelMock)
        )
      })

      it('triggers the core.uploadFail() action with the file id and the error from uploadModel()', () => {
        const cmd = findCmd(state, uploadModel)
        const action = cmd.simulate({success: false, result: uploadModelMock})

        expect(
          action,
          'to equal',
          core.uploadFail(uploadFileAction.payload.fileId, uploadModelMock)
        )
      })
    })
  })

  describe('uploadProgress()', () => {
    let fileId
    let state

    beforeEach(() => {
      const uploadFileAction = core.uploadFile(fileMock())
      const stateBeforeUploadProgress = reducer(undefined, uploadFileAction)

      fileId = uploadFileAction.payload.fileId
      state = reducer(getModel(stateBeforeUploadProgress), core.uploadProgress(fileId, 42))
    })

    describe('using selectUploadingModels() selector', () => {
      it('updates the model with the given file id', () => {
        const model = selectUploadingModels(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {progress: 42})
      })

      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = core.uploadFile(fileMock())
        const uploadFileAction2 = core.uploadFile(fileMock())
        const uploadFileAction3 = core.uploadFile(fileMock())
        const fileId2 = uploadFileAction2.payload.fileId

        const stateBeforeUploadProgress = [
          uploadFileAction1,
          uploadFileAction2,
          uploadFileAction3
        ].reduce((currentState, action) => reducer(getModel(currentState), action), undefined)
        const orderBeforeDispatch = selectUploadingModels(getModel(stateBeforeUploadProgress)).map(
          m => m.fileId
        )

        const stateAfterUploadProgress = reducer(
          getModel(stateBeforeUploadProgress),
          core.uploadProgress(fileId2, 42)
        )
        const orderAfterDispatch = selectUploadingModels(getModel(stateAfterUploadProgress)).map(
          m => m.fileId
        )

        expect(orderBeforeDispatch, 'to equal', orderAfterDispatch)
      })
    })
  })

  describe('uploadComplete()', () => {
    let fileId
    let state

    beforeEach(() => {
      const uploadFileAction = core.uploadFile(fileMock())

      fileId = uploadFileAction.payload.fileId
      state = [uploadFileAction, core.uploadComplete(fileId, uploadModelMock)].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    describe('using selectUploadingModels() selector', () => {
      it('does not return the model with the given file id', () => {
        const model = selectUploadingModels(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to be', undefined)
      })
    })

    describe('using selectModels() selector', () => {
      it('returns the given backend model with a quantity property', () => {
        const model = selectModels(getModel(state)).find(m => m.modelId === uploadModelMock.modelId)

        expect(model, 'to satisfy', {
          ...uploadModelMock,
          quantity: 1
        })
      })
    })
  })

  describe('uploadFail()', () => {
    let fileId
    let error
    let state

    beforeEach(() => {
      const uploadFileAction = core.uploadFile(fileMock())

      error = new Error('Some error')
      fileId = uploadFileAction.payload.fileId
      state = [uploadFileAction, core.uploadFail(fileId, error)].reduce(
        (currentState, action) => reducer(getModel(currentState), action),
        undefined
      )
    })

    describe('using selectUploadingModels() selector', () => {
      it('contains the uploading model with an error flag and errorMessage', () => {
        const model = selectUploadingModels(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {
          error: true,
          errorMessage: error.message
        })
      })
    })

    describe('using selectModels() selector', () => {
      it('does not contain the model', () => {
        const model = selectModels(getModel(state)).find(m => m.modelId === uploadModelMock.modelId)

        expect(model, 'to equal', undefined)
      })
    })
  })
})
