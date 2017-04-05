import {
  uploadFile,
  uploadFiles,
  checkUploadStatus,
  changeQuantity,
  changeIndividualQuantity,
  changeUnit
} from '../../../../src/app/action/model'
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
        modelId: 'some-mode-id',
        thumbnailUrl: 'some-thumbnail-url'
      }
      file = {
        name: 'some-file-name',
        size: 42
      }
    })

    it('success uploading to the backend', async () => {
      printingEngine.uploadModel.resolves(apiResponse)

      printingEngine.getUploadStatus.resolves(true)
      printingEngine.getPriceStatus.resolves(true)  // Finished polling

      await store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0
      })

      expect(store.getState().model.uploadedModels[0], 'to satisfy', {
        name: 'some-file-name',
        size: 42,
        progress: 1,
        uploadFinished: 1,
        modelId: 'some-mode-id',
        thumbnailUrl: 'some-thumbnail-url'
      })

      expect(store.getState().model.models['some-mode-id'], 'to satisfy', {
        name: 'some-file-name',
        size: 42,
        modelId: 'some-mode-id',
        thumbnailUrl: 'some-thumbnail-url'
      })
    })

    it('fails uploading to the backend', async () => {
      printingEngine.uploadModel.rejects(new Error())

      try {
        await store.dispatch(uploadFile(file, 'some-callback'))
      } catch (e) {
        // do nothing
      }

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0
      })

      expect(store.getState().model.uploadedModels[0], 'to satisfy', {
        error: true
      })
    })
  })

  describe('checkUploadStatus()', () => {
    it('handles the finished case', async () => {
      printingEngine.getUploadStatus.resolves(true)

      store = Store({
        model: {
          models: {
            'some-model-id': {}
          }
        }
      })

      await store.dispatch(checkUploadStatus({modelId: 'some-model-id'}))

      expect(store.getState().model.models['some-model-id'], 'to satisfy', {
        checkStatusFinished: true
      })
    })

    it('handles the aborted case', async () => {
      printingEngine.getUploadStatus.rejects(new Error())

      store = Store({
        model: {
          models: {
            'some-model-id': {}
          }
        }
      })

      try {
        await store.dispatch(checkUploadStatus({modelId: 'some-model-id'}))
      } catch (e) {
        expect(store.getState().model.models['some-model-id'], 'to satisfy', {
          checkStatusFinished: true,
          error: true
        })
      }
    })
  })

  describe('uploadFiles()', () => {
    it('works for the success case', async () => {
      const apiResponse = {
        modelId: 'some-model-id',
        thumbnailUrl: 'some-thumbnail-url'
      }
      const files = [{
        name: 'some-file-name',
        size: 42
      }]

      printingEngine.uploadModel.resolves(apiResponse)
      printingEngine.getUploadStatus.resolves(true)
      printingEngine.createPriceRequest.resolves({priceId: '123'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: 'some-price'
      }) // Finished polling

      store = Store({
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something'
            },
            materialStructure: []
          }
        },
        user: {
          userId: 'some-user-id',
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

      await store.dispatch(uploadFiles(files, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0,
        selectedUnit: 'mm'
      })

      expect(store.getState().model.models['some-model-id'], 'to satisfy', {
        name: 'some-file-name',
        thumbnailUrl: 'some-thumbnail-url',
        size: 42,
        modelId: 'some-model-id',
        checkStatusFinished: true
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: '123'
      })
    })
  })

  describe('handleQuantityChanged()', () => {
    it('works for the default case', async () => {
      store = Store({
        model: {
          models: {
            'some-model-id': {
              modelId: 'some-model-id'
            }
          }
        },
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something'
            },
            materialStructure: []
          }
        },
        user: {
          userId: 'some-user-id',
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

      printingEngine.createPriceRequest.resolves({priceId: '123'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: 'some-price'
      }) // Finished polling

      await store.dispatch(changeQuantity({quantity: 42}))

      expect(store.getState().model.models['some-model-id'], 'to satisfy', {
        quantity: 42
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: '123'
      })
    })
  })

  describe('handleIndividualQuantityChanged()', () => {
    it('works for the default case', async () => {
      store = Store({
        model: {
          models: {
            'some-model-id': {
              modelId: 'some-model-id'
            }
          }
        },
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something'
            },
            materialStructure: []
          }
        },
        user: {
          userId: 'some-user-id',
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

      printingEngine.createPriceRequest.resolves({priceId: '123'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: 'some-price'
      }) // Finished polling

      await store.dispatch(changeIndividualQuantity({quantity: 42, modelId: 'some-model-id'}))

      expect(store.getState().model.models['some-model-id'], 'to satisfy', {
        quantity: 42
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: '123'
      })
    })
  })

  describe('changeUnit()', () => {
    it('updates the current selected unit state', () => {
      store.dispatch(changeUnit({unit: 'some-unit'}))
      expect(store.getState().model.selectedUnit, 'to equal', 'some-unit')
    })
  })
})
