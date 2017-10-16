import {
  uploadFiles,
  deleteFile,
  changeQuantity,
  changeIndividualQuantity,
  changeUnit
} from 'Action/model'
import * as printingEngine from 'Lib/printing-engine'
import {resetPollState} from 'Lib/poll'
import Store from '../../../../src/app/store'
import {ERROR_TYPE} from '../../../../src/app/type'

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

  describe('uploadFiles()', () => {
    let file

    beforeEach(() => {
      file = {
        name: 'some-file-name',
        size: 42
      }

      printingEngine.uploadModel.resolves({
        modelId: 'some-model-id',
        thumbnailUrl: 'some-thumbnail-url',
        fileName: 'some-file.stl',
        fileUnit: 'mm',
        area: 100,
        volume: 200,
        dimensions: {x: 1, y: 2, z: 3}
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
      }) // Finished polling

      store = Store({
        material: {
          materials: {
            materialConfigs: {
              'some-material-id': 'something'
            },
            materialStructure: []
          },
          selectedMaterialConfig: 'some-material-id'
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
    })

    it('uploads a file', async () => {
      await store.dispatch(uploadFiles([file]))

      expect(store.getState().model.numberOfUploads, 'to equal', 0)

      const models = store.getState().model.models
      expect(models.length, 'to equal', 1)
      expect(models[0], 'to satisfy', {
        fileId: expect.it('to be a string'),
        modelId: 'some-model-id',
        thumbnailUrl: 'some-thumbnail-url',
        fileSize: 42,
        progress: 1,
        uploadFinished: true,
        quantity: 1,
        fileName: 'some-file.stl',
        fileUnit: 'mm',
        area: 100,
        volume: 200,
        dimensions: {x: 1, y: 2, z: 3}
      })

      expect(store.getState().price, 'to satisfy', {
        priceId: 'some-price-id'
      })

      expect(store.getState().material.selectedMaterialConfig, 'to be', undefined)
    })

    it('handles error when upload failes', () => {
      printingEngine.uploadModel.rejects(new Error('some-error'))

      store.dispatch(uploadFiles([file])).catch((error) => {
        expect(error, 'to satisfy', {
          type: ERROR_TYPE.FILE_UPLOAD_FAILED
        })

        expect(store.getState().model.numberOfUploads, 'to equal', 0)

        const models = store.getState().model.models
        expect(models.length, 'to equal', 1)
        expect(models[0], 'to satisfy', {
          fileId: expect.it('to be a string'),
          progress: 1,
          error
        })

        expect(store.getState().material.selectedMaterialConfig, 'to be', undefined)
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

  describe('deleteFile()', () => {
    it('deletes file and creates a price request', async () => {
      store = Store({
        model: {
          models: [
            {fileId: 1},
            {fileId: 2}
          ]
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

      await store.dispatch(deleteFile(2))

      expect(store.getState().model.models, 'to equal', [{
        fileId: 1
      }])

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
})
