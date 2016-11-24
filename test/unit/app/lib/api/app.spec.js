import $app from '../../../../../src/app/lib/api/app';

describe('api app', () => {
  let http;
  let app;

  beforeEach(() => {
    http = {
      get: sinon.stub().resolves(),
      put: sinon.stub().resolves(),
      post: sinon.stub().resolves(),
      remove: sinon.stub().resolves()
    };

    app = $app({http});
  });

  describe('getConstants()', () => {
    it('calls http.get', () => {
      return app.getConstants().then(() => {
        expect(http.get, 'to have a call satisfying', [
          '/api/constants/'
        ]);
      });
    });
  });
});
