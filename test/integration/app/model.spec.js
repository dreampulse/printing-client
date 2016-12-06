import ModelAction from '../../../src/app/action/model'
import Store from '../../../src/app/store'
import printingEngine from '../../../src/app/lib/printing-engine'

describe('Model Integration Test', () => {
  let model, store

  const modelId = 'some-model-id'

  beforeEach(() => {
    sinon.stub(printingEngine)
    store = Store({})
    model = ModelAction({printingEngine})
  })

  afterEach(() => {
    sinon.restore(printingEngine)
  })


  describe('upload()', () => {
    it('calls the printing engine api', async () => {
      const apiResponse = 'upload-model-api-response'
      printingEngine.uploadModel.resolves(apiResponse)
      const result = await store.dispatch(model.upload('some-form-data', 'some-callback'))
      expect(printingEngine.uploadModel, 'was called with', 'some-form-data', 'some-callback')
      expect(result, 'to equal', apiResponse)
    })
  });

  describe('modelUploaded()', () => {
    it('handles the finished case', async () => {
      printingEngine.pollUploadStatus.resolves(true)
      const options = {modelId}
      await store.dispatch(model.modelUploaded(options))

      expect(store.getState().model, 'to equal', {
        isUploadFinished: true,
        modelId
      })
      expect(printingEngine.pollUploadStatus, 'was called with', options)
    })
  })
})
