import {Cmd} from 'redux-loop'
import * as core from 'App/action-next/core'
import {
  selectMaterialGroups,
  selectUploadingFiles,
  selectModels,
  selectBasketItems
} from 'App/selector'
import {uploadModel} from 'App/lib/printing-engine'

import reducer from 'App/reducer'
import {withOneUploadedModel} from '../../../scenario'
import materialListResponse from '../../../../test-data/mock/material-list-response.json'
import getUploadModelMock from '../../../mock/printing-engine/upload-model'
import getFileMock from '../../../mock/file'

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
      uploadFileAction = core.uploadFile(getFileMock())
      state = reducer(undefined, uploadFileAction)
    })

    it('creates unique fileIds', () => {
      const uploadFileAction1 = core.uploadFile(getFileMock())
      const uploadFileAction2 = core.uploadFile(getFileMock())

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
          getFileMock,
          {unit: 'mm'},
          expect.it('to be a', 'function')
        ])
        const action = cmd.simulate({success: true, result: getUploadModelMock()})

        expect(
          action,
          'to equal',
          core.uploadComplete(uploadFileAction.payload.fileId, getUploadModelMock())
        )
      })

      it('triggers the core.uploadFail() action with the file id and the error from uploadModel()', () => {
        const cmd = findCmd(state, uploadModel)
        const action = cmd.simulate({success: false, result: getUploadModelMock()})

        expect(
          action,
          'to equal',
          core.uploadFail(uploadFileAction.payload.fileId, getUploadModelMock())
        )
      })
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
      const uploadFileAction = core.uploadFile(getFileMock())
      fileId = uploadFileAction.payload.fileId
      const uploadProgressAction = core.uploadProgress(fileId, 42)

      const stateBeforeUploadProgress = reducer(undefined, uploadFileAction)
      state = reducer(getModel(stateBeforeUploadProgress), uploadProgressAction)
    })

    describe('using selectUploadingFiles() selector', () => {
      it('updates the model with the given file id', () => {
        const model = selectUploadingFiles(getModel(state)).find(m => m.fileId === fileId)

        expect(model, 'to satisfy', {progress: 42})
      })

      it('does not change the order (or manipulate the array unexpectedly)', () => {
        const uploadFileAction1 = core.uploadFile(getFileMock())
        const uploadFileAction2 = core.uploadFile(getFileMock())
        const uploadFileAction3 = core.uploadFile(getFileMock())
        const fileId2 = uploadFileAction2.payload.fileId

        const stateBefore = [uploadFileAction1, uploadFileAction2, uploadFileAction3].reduce(
          (currentState, action) => reducer(getModel(currentState), action),
          undefined
        )
        const orderBeforeDispatch = selectUploadingFiles(getModel(stateBefore)).map(m => m.fileId)

        const stateAfterUploadProgress = reducer(
          getModel(stateBefore),
          core.uploadProgress(fileId2, 42)
        )
        const orderAfterDispatch = selectUploadingFiles(getModel(stateAfterUploadProgress)).map(
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
      const uploadFileAction = core.uploadFile(getFileMock())
      error = new Error('Some error')
      fileId = uploadFileAction.payload.fileId
      const uploadFailAction = core.uploadFail(fileId, error)

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

    describe('using selectModels() selector', () => {
      it('does not contain the model', () => {
        const model = selectModels(getModel(state)).find(
          m => m.modelId === getUploadModelMock.modelId
        )

        expect(model, 'to equal', undefined)
      })
    })
  })

  describe('deleteBasketItem()', () => {
    describe('when the item is once in the basket', () => {
      let state

      beforeEach(() => {
        const deleteBasketItemAction = core.deleteBasketItem(0)
        state = reducer(getModel(withOneUploadedModel()), deleteBasketItemAction)
      })

      describe('using selectModels() selector', () => {
        it('does not contain the model any more', () => {
          const models = selectModels(getModel(state))
          expect(models, 'to equal', [])
        })
      })

      describe('using selectBasketItems() selector', () => {
        it('does not contain the model any more', () => {
          const basketItems = selectBasketItems(getModel(state))
          expect(basketItems, 'to equal', [])
        })
      })
    })

    describe('when the item is twice in the basket', () => {
      it('still contains the model')

      it('just contains the item once')
    })
  })
})
