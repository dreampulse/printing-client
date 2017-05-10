import * as http from 'Service/http'
import * as printingEngine from 'Lib/printing-engine'

// TODO: move this to unit tests and write unit tests for printing engine lib
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
      const {modelId} = await printingEngine.uploadModel('form', onProgess)
      expect(modelId, 'to equal', '123')
      expect(http.upload, 'was called with', /model/, 'form', onProgess)
    })
  })
})
