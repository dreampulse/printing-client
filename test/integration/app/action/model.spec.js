import { upload, modelUploaded } from '../../../../src/app/action/model'
import Store from '../../../../src/app/store'
import * as printingEngine from '../../../../src/app/lib/printing-engine'

describe('Model Integration Test', () => {
  let store

  const modelId = 'some-model-id'

  beforeEach(() => {
    sinon.stub(printingEngine)
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })

  describe('upload()', () => {
    it('calls the printing engine api', async () => {
      const apiResponse = 'upload-model-api-response'
      printingEngine.uploadModel.resolves(apiResponse)
      const result = await store.dispatch(upload('some-form-data', 'some-callback'))
      expect(printingEngine.uploadModel, 'was called with', 'some-form-data', 'some-callback')
      expect(result, 'to equal', apiResponse)
    })
  })

  describe('modelUploaded()', () => {
    it('handles the finished case', async () => {
      printingEngine.getUploadStatus.resolves(true)
      await store.dispatch(modelUploaded({modelId}))

      expect(store.getState().model, 'to equal', {
        isUploadFinished: true,
        modelId
      })
    })

    it('handles the aborted case', async () => {
      printingEngine.getUploadStatus.rejects(new Error())
      await store.dispatch(modelUploaded({modelId}))

      expect(store.getState().model, 'to equal', {
        isUploadFinished: false,
        modelId
      })
    })
  })
})
