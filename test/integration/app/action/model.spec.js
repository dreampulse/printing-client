import {
  uploadFiles,
  changeQuantity,
  changeIndividualQuantity,
  changeUnit
} from 'Action/model'
import * as printingEngine from 'Lib/printing-engine'
import {resetPollState} from 'Lib/poll'
import Store from '../../../../src/app/store'

import config from '../../../../config'

describe('Model Integration Test', () => {
  let store
  let sandbox

  beforeEach(() => {
    store = Store({})

    resetPollState()

    sandbox = sinon.sandbox.create()
    sandbox.stub(config, 'pollingInverval', 0)
    sandbox.stub(config, 'pollingDebouncedWait', 0)

    sandbox.stub(printingEngine)
  })

  afterEach(() => {
    sandbox.restore()
  })

  /* describe('uploadFile()', () => {
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
        numberOfUploads: 1
      })

      expect(store.getState().model.uploadedModels[0], 'to satisfy', {
        error: true
      })
    })
  }) */

  describe('uploadFiles()', () => {
    it('uploads a file', async () => {
      const apiResponse = {
        modelId: 'some-model-id',
        thumbnailUrl: 'some-thumbnail-url'
      }
      const files = [{
        name: 'some-file-name',
        size: 42
      }]

      printingEngine.uploadModel.resolves(apiResponse)
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

      const models = store.getState().model.models
      expect(models.length, 'to equal', 1)
      expect(models[0], 'to satisfy', {
        fileId: expect.it('to be a string'),
        modelId: 'some-model-id',
        name: 'some-file-name',
        thumbnailUrl: 'some-thumbnail-url',
        size: 42,
        progress: 1,
        uploadFinished: true,
        quantity: 1
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: '123'
      })
    })
  })

  describe('changeQuantity()', () => {
    it('changes quanity and creates a price request', async () => {
      store = Store({
        model: {
          models: [{
            modelId: 'some-model-id',
            quantity: 1
          }]
        },
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something',
              'some-material-other-id': 'something'
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

      printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: [{
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })

      await store.dispatch(changeQuantity({quantity: 42}))

      expect(store.getState().model.models[0], 'to satisfy', {
        quantity: 42
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        }
      })
    })
  })

  describe('changeIndividualQuantity()', () => {
    it('changes quanity and creates a price request', async () => {
      store = Store({
        model: {
          models: [{
            modelId: 'some-model-id',
            quantity: 1
          }]
        },
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something',
              'some-material-other-id': 'something'
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

      printingEngine.createPriceRequest.resolves({priceId: 'some-price-id'})
      printingEngine.getPriceWithStatus.resolves({
        isComplete: true,
        price: {
          offers: [{
            materialConfigId: 1,
            printingService: 'some-service',
            shipping: {name: 'some-shipping'}
          }],
          printingServiceComplete: {
            shapeways: true,
            imaterialize: true
          }
        }
      })

      await store.dispatch(changeIndividualQuantity({quantity: 42, modelId: 'some-model-id'}))

      expect(store.getState().model.models[0], 'to satisfy', {
        quantity: 42
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id',
        offers: [{
          materialConfigId: 1,
          printingService: 'some-service',
          shipping: {name: 'some-shipping'}
        }],
        printingServiceComplete: {
          shapeways: true,
          imaterialize: true
        }
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
