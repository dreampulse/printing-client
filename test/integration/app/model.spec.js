import { model } from '../../../src/app/action'
import Store from '../../../src/app/store'
import * as restApi from '../../../src/app/lib/printing-engine/rest-api'


describe('Model Integration Test', () => {
  let store

  const modelId = 'some-model-id'

  beforeEach(() => {
    sinon.stub(restApi)
    store = Store({})
  })

  afterEach(() => {
    sinon.restore(restApi)
  })

  describe('upload()', () => {
    it('calls the printing engine api', async () => {
      const apiResponse = 'upload-model-api-response'
      restApi.uploadModel.resolves(apiResponse)
      const result = await store.dispatch(model.upload('some-form-data', 'some-callback'))
      expect(restApi.uploadModel, 'was called with', 'some-form-data', 'some-callback')
      expect(result, 'to equal', apiResponse)
    })
  });

  describe('modelUploaded()', () => {
    it('handles the finished case', async () => {
      restApi.getUploadStatus.resolves(true)
      await store.dispatch(model.modelUploaded({modelId}))

      expect(store.getState().model, 'to equal', {
        isUploadFinished: true,
        modelId
      })
    })
  })
})
