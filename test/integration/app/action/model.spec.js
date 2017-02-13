import {uploadFile, uploadFiles, uploadToBackendFinished} from '../../../../src/app/action/model'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

import TYPE from '../../../../src/app/type'

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

    it('success uploading to the backend', async () => {
      printingEngine.uploadModel.resolves(apiResponse)

      store.dispatch(uploadFile(file, 'some-callback'))
      await actionFinished(store, TYPE.MODEL.UPLOAD_TO_BACKEND_FINISHED)

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
      printingEngine.uploadModel.rejects(new Error())

      store.dispatch(uploadFile(file, 'some-callback'))
      await actionFinished(store, TYPE.MODEL.UPLOAD_TO_BACKEND_FAILED)

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

      store.dispatch(uploadToBackendFinished({modelId: 'some-model-id', fileId: 'some-file-id'}))
      await actionFinished(store, TYPE.MODEL.CHECK_STATUS_FINISHED)

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

      try {
        await store.dispatch(uploadToBackendFinished({modelId: 'some-model-id', fileId: 'some-file-id'}))
      } catch (e) {
        expect(store.getState().model.models[0], 'to satisfy', {
          checkStatusFinished: true,
          error: true
        })
      }
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

      printingEngine.uploadModel.resolves(apiResponse)
      printingEngine.getUploadStatus.resolves(true)
      printingEngine.createPriceRequest.resolves({priceId: '123'})
      printingEngine.getPriceStatus.resolves(true)  // Finished polling
      printingEngine.getPrice.resolves('some-price')

      store = Store({
        material: {
          materials: {
            'some-material-id': 'something'
          }
        },
        user: {
          user: {
            shippingAddress: {
              city: 'Pittsburgh',
              zipCode: '15234',
              stateCode: 'PA',
              countryCode: 'US'
            }
          }
        }
      })

      store.dispatch(uploadFiles(files, 'some-callback'))
      await actionFinished(store, TYPE.MODEL.CHECK_STATUS_FINISHED)

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
