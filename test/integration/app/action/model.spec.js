import {checkUploadStatus, uploadFile, uploadFiles} from '../../../../src/app/action/model'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Model Integration Test', () => {
  let store

  beforeEach(() => {
    sinon.stub(printingEngine)
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('uploadFile()', () => {
    let apiResponse
    let file

    beforeEach(() => {
      apiResponse = {
        modelId: 'some-mode-id'
      }
      file = {
        name: 'some-file-name',
        size: 42
      }
    })

    it('starts the upload to the backend', () => {
      printingEngine.uploadModel.resolves(apiResponse)

      const promise = store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: false,
        numberOfUploads: 1
      })

      expect(store.getState().model.models[0], 'to satisfy', {
        name: 'some-file-name',
        size: 42,
        progress: 0
      })

      return promise
    })

    it('success uploading to the backend', async () => {
      printingEngine.uploadModel.resolves(apiResponse)

      await store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0
      })

      expect(store.getState().model.models[0], 'to satisfy', {
        name: 'some-file-name',
        size: 42,
        progress: 1,
        modelId: 'some-mode-id'
      })
    })

    it('fails uploading to the backend', async () => {
      printingEngine.uploadModel.rejects()

      try {
        await store.dispatch(uploadFile(file, 'some-callback'))
      } catch (e) {
        // Expect a failure
      }

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0
      })

      expect(store.getState().model.models[0], 'to satisfy', {
        error: true
      })
    })
  })

  describe('checkUploadStatus()', () => {
    it('handles the finished case', async () => {
      printingEngine.getUploadStatus.resolves(true)

      store = Store({
        model: {
          models: [{
            fileId: 'some-file-id'
          }]
        }
      })

      await store.dispatch(checkUploadStatus({modelId: 'some-model-id', fileId: 'some-file-id'}))

      expect(store.getState().model.models[0], 'to satisfy', {
        checkStatusFinished: true
      })
    })

    it('handles the aborted case', async () => {
      printingEngine.getUploadStatus.rejects(new Error())

      store = Store({
        model: {
          models: [{
            fileId: 'some-file-id'
          }]
        }
      })

      await store.dispatch(checkUploadStatus({modelId: 'some-model-id', fileId: 'some-file-id'}))

      expect(store.getState().model.models[0], 'to satisfy', {
        checkStatusFinished: true,
        error: true
      })
    })
  })

  describe('uploadFiles()', () => {
    it('works for the success case', async () => {
      const apiResponse = {
        modelId: 'some-mode-id'
      }
      const files = [{
        name: 'some-file-name',
        size: 42
      }]
      printingEngine.getUploadStatus.resolves(true)
      printingEngine.uploadModel.resolves(apiResponse)

      await store.dispatch(uploadFiles(files, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0,
        selectedUnit: 'mm'
      })

      expect(store.getState().model.models[0], 'to satisfy', {
        name: 'some-file-name',
        size: 42,
        progress: 1,
        modelId: 'some-mode-id',
        checkStatusFinished: true
      })
    })
  })
})
