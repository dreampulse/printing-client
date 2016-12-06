import ModelAction from '../../../src/app/action/model'
import Store from '../../../src/app/store'
import * as api from '../../../src/app/lib/api'

describe('Model Integration Test', () => {
  let model, store

  const modelId = 'some-model-id'

  beforeEach(() => {
    sinon.stub(api.printingEngine)
    store = Store({})
    model = ModelAction({api})
  })

  afterEach(() => {
    sinon.restore(api.printingEngine)
  })


  describe('upload()', () => {
    it('calls the printing engine api', async () => {
      const apiResponse = 'upload-model-api-response'
      api.printingEngine.uploadModel.resolves(apiResponse)
      const result = await store.dispatch(model.upload('some-form-data', 'some-callback'))
      expect(api.printingEngine.uploadModel, 'was called with', 'some-form-data', 'some-callback')
      expect(result, 'to equal', apiResponse)
    })
  });

  describe('modelUploaded()', () => {
    it('handles the finished case', async () => {
      api.printingEngine.getUploadStatus.resolves(true)
      const options = {modelId}
      await store.dispatch(model.modelUploaded(options))

      expect(store.getState().model, 'to equal', {
        isUploadFinished: true,
        modelId
      })
      expect(api.printingEngine.getUploadStatus, 'was called with', options)
    })
  })
})
