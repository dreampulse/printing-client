import config from '../../../../../src/app/config'
import * as http from '../../../../../src/app/service/http'
import * as restApi from '../../../../../src/app/lib/printing-engine/rest-api'

describe('Printing Engine REST Api Integration Test', () => {
  beforeEach(() => {
    sinon.stub(http)
  })

  afterEach(() => {
    sinon.restore(http)
  })

  describe('uploadModel()', () => {
    it('should work', async () => {
      http.upload.resolves({modelId: '123'})
      const onProgess = () => {}
      const {modelId} = await restApi.uploadModel('form', onProgess)
      expect(modelId, 'to equal', '123')
      expect(http.upload, 'was called with', /model/, 'form', onProgess)
    })
  })

  describe('getUploadStatus()', () => {
    it('should return true for 200', async () => {
      http.fetch.resolves({status: 200})
      const isFinished = await restApi.getUploadStatus({modelId: '123'})
      expect(http.fetch, 'was called with', /model\/123/)
      expect(isFinished, 'to be true')
    })

    it('should return false for other status code', async () => {
      http.fetch.resolves({status: 500})
      const isFinished = await restApi.getUploadStatus({modelId: '123'})
      expect(http.fetch, 'was called with', /model\/123/)
      expect(isFinished, 'to be false')
    })
  })
})
