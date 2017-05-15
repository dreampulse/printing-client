import {
  changeQuantity,
  changeIndividualQuantity,
  uploadFiles,
  deleteFile
} from 'Action/model'
import * as priceActions from 'Action/price'
import * as printingEngine from 'Lib/printing-engine'
import TYPE, {ERROR_TYPE} from '../../../../src/app/type'
import {resolveAsyncThunk} from '../../../helper'

describe('Model actions', () => {
  let sandbox
  let initialStoreData
  let store

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    initialStoreData = {
      model: {
        selectedUnit: 'mm'
      }
    }
    store = mockStore(initialStoreData)

    sandbox.stub(priceActions)
    sandbox.stub(printingEngine)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('changeQuantity()', () => {
    it('dispatches expected actions', async () => {
      priceActions.createDebouncedPriceRequest
        .withArgs()
        .returns(resolveAsyncThunk('some-create-debounced-price-request'))

      await store.dispatch(changeQuantity({quantity: 123}))
      expect(store.getActions(), 'to equal', [{
        type: TYPE.MODEL.QUANTITIY_CHANGED,
        payload: {quantity: 123}
      }, {
        type: 'some-create-debounced-price-request'
      }])
    })
  })

  describe('changeIndividualQuantity()', () => {
    it('dispatches expected actions', async () => {
      priceActions.createDebouncedPriceRequest
        .withArgs()
        .returns(resolveAsyncThunk('some-create-debounced-price-request'))

      await store.dispatch(changeIndividualQuantity({modelId: 'some-id', quantity: 123}))
      expect(store.getActions(), 'to equal', [{
        type: TYPE.MODEL.INDIVIDUAL_QUANTITIY_CHANGED,
        payload: {modelId: 'some-id', quantity: 123}
      }, {
        type: 'some-create-debounced-price-request'
      }])
    })
  })

  describe('uploadFiles()', () => {
    let file

    beforeEach(() => {
      file = {name: 'some-name', size: 123}

      priceActions.createPriceRequest
        .withArgs()
        .returns(resolveAsyncThunk('some-create-price-request'))

      printingEngine.uploadModel
        .callsFake((f, params, onUploadProgressed) => {
          onUploadProgressed(1)
          return Promise.resolve({
            modelId: 'some-model-id',
            thumbnailUrl: 'some-url',
            fileName: 'some-file.stl',
            fileUnit: 'mm',
            area: 100,
            volume: 200,
            dimensions: {x: 1, y: 2, z: 3}
          })
        })
    })

    it('calls uploadModel() with expected parameters', async () => {
      await store.dispatch(uploadFiles([file]))

      expect(printingEngine.uploadModel, 'to have a call satisfying', [
        file,
        {unit: 'mm'},
        expect.it('to be a function')
      ])
    })

    it('dispatches expected actions', async () => {
      await store.dispatch(uploadFiles([file]))

      // Get created file id for later checks
      const fileId = store.getActions()[2].payload.fileId

      expect(store.getActions(), 'to satisfy', [{
        type: TYPE.PRICE.CLEAR_OFFERS,
        payload: undefined
      }, {
        type: TYPE.MATERIAL.CONFIG_SELECTED,
        payload: undefined
      }, {
        type: TYPE.MODEL.FILE_UPLOAD_STARTED,
        payload: {
          fileId: expect.it('to be a string'),
          name: 'some-name',
          size: 123
        }
      }, {
        type: TYPE.MODEL.FILE_UPLOAD_PROGRESSED,
        payload: {
          fileId,
          progress: 1
        }
      }, {
        type: TYPE.MODEL.FILE_UPLOADED,
        payload: {
          fileId,
          modelId: 'some-model-id',
          thumbnailUrl: 'some-url',
          fileName: 'some-file.stl',
          fileUnit: 'mm',
          area: 100,
          volume: 200,
          dimensions: {x: 1, y: 2, z: 3}
        }
      }, {
        type: 'some-create-price-request'
      }])
    })

    describe('when upload failes:', () => {
      beforeEach(() => {
        printingEngine.uploadModel.rejects(new Error('some-error'))
      })

      it('rejects with FileUploadError', () => {
        const promise = store.dispatch(uploadFiles([file]))

        expect(promise, 'to be rejected with error satisfying', {
          type: ERROR_TYPE.FILE_UPLOAD_FAILED,
          fileId: expect.it('to be a string')
        })
      })

      it('dispatches expected actions', () => (
        store.dispatch(uploadFiles([file])).catch(() => {
          expect(store.getActions(), 'to satisfy', [{
            type: TYPE.PRICE.CLEAR_OFFERS,
            payload: undefined
          }, {
            type: TYPE.MATERIAL.CONFIG_SELECTED,
            payload: undefined
          }, {
            type: TYPE.MODEL.FILE_UPLOAD_STARTED,
            payload: {
              fileId: expect.it('to be a string'),
              name: 'some-name',
              size: 123
            }
          }, {
            type: TYPE.MODEL.FILE_UPLOADED,
            payload: expect.it('to satisfy', {
              type: ERROR_TYPE.FILE_UPLOAD_FAILED,
              fileId: expect.it('to be a string')
            }),
            error: true
          }])
        })
      ))
    })
  })

  describe('deleteFile()', () => {
    it('dispatches expected actions', async () => {
      priceActions.createPriceRequest
        .withArgs()
        .returns(resolveAsyncThunk('some-create-price-request'))

      await store.dispatch(deleteFile('some-file-id'))
      expect(store.getActions(), 'to equal', [{
        type: TYPE.MODEL.FILE_DELETED,
        payload: {fileId: 'some-file-id'}
      }, {
        type: 'some-create-price-request'
      }])
    })
  })
})
