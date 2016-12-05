import Model from '../../../../src/app/action/model';

describe('model actions', () => {
  let model;
  let api;
  let store;

  beforeEach(() => {
    api = {
      printingEngine: {
        uploadModel: sinon.stub()
          .resolves('upload-model-api-response'),
        getUploadStatus: sinon.stub()
          .resolves('get-upload-status-api-response')
      }
    };

    store = mockStore({});

    model = Model({api});
  });

  describe('upload()', () => {
    it('calls the printing engine api', async () => {
      const result = await store.dispatch(model.upload('some-form-data', 'some-callback'))
      expect(store.getActions(), 'to equal', [])
      expect(api.printingEngine.uploadModel, 'was called with', 'some-form-data', 'some-callback')
      expect(result, 'to equal', 'upload-model-api-response')
    })
  });

  describe('modelUploaded()', () => {
    it('handles the finished case', async () => {
      api.printingEngine.getUploadStatus = sinon.stub().resolves(true)
      const options = {modelId: 'some-model-id'}

      await store.dispatch(model.modelUploaded(options))

      expect(store.getActions(), 'to equal', [
        { type: 'MODEL.UPLOAD_STARTED', payload: 'some-model-id' },
        { type: 'MODEL.UPLOAD_FINISHED' }
      ])

      expect(api.printingEngine.getUploadStatus, 'was called with', options)
    })

    it.skip('reties a few times')  // @TODO
  })
})
