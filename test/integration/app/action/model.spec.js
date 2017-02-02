import {upload, uploadFile} from '../../../../src/app/action/model'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Model Integration Test', () => {
  let store

  // const modelId = 'some-model-id'

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

    it('starts the upload to the backend', async () => {
      store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: false,
        numberOfUploads: 1
      })

      const fileId = Object.keys(store.getState().model.models)[0]

      expect(store.getState().model.models[fileId], 'to equal', {
        fileId,
        name: 'some-file-name',
        size: 42,
        progress: 0
      })
    })

    it('success uploading to the backend', async () => {
      printingEngine.uploadModel.resolves(apiResponse)

      await store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: true,
        numberOfUploads: 0
      })

      const fileId = Object.keys(store.getState().model.models)[0]

      expect(store.getState().model.models[fileId], 'to equal', {
        fileId,
        name: 'some-file-name',
        size: 42,
        progress: 1,
        modelId: 'some-mode-id'
      })
    })

    it('fails uploading to the backend', async () => {
      printingEngine.uploadModel.rejects()

      await store.dispatch(uploadFile(file, 'some-callback'))

      expect(store.getState().model, 'to satisfy', {
        areAllUploadsFinished: false,
        numberOfUploads: 0
      })

      const fileId = Object.keys(store.getState().model.models)[0]

      expect(store.getState().model.models[fileId], 'to satisfy', {
        fileId,
        error: true
      })
    })
  })

  // describe('modelUploaded()', () => {
  //   it('handles the finished case', async () => {
  //     printingEngine.getUploadStatus.resolves(true)
  //     await store.dispatch(modelUploaded({modelId}))
  //
  //     expect(store.getState().model, 'to equal', {
  //       isUploadFinished: true,
  //       modelId
  //     })
  //   })
  //
  //   it('handles the aborted case', async () => {
  //     printingEngine.getUploadStatus.rejects(new Error())
  //     await store.dispatch(modelUploaded({modelId}))
  //
  //     expect(store.getState().model, 'to equal', {
  //       isUploadFinished: false,
  //       modelId
  //     })
  //   })
  // })
})
