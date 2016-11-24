import $method from '../../../../../../src/app/lib/api/http/method';

describe('http method', () => {
  let request;
  let bodyParser;
  let method;

  beforeEach(() => {
    request = sinon.stub().resolves();
    bodyParser = {
      parseJson: () => {}
    };
    method = $method({request, bodyParser});
  });

  function describeNoBody(httpMethod, httpFunctionName) {
    return () => {
      let path;
      let query;
      let parser;
      let httpFunction;

      beforeEach(() => {
        path = '/some/path';
        query = {some: 'query'};
        parser = () => {};
        httpFunction = method[httpFunctionName];
      });

      it('calls request with defaults', () => {
        httpFunction(path)
          .then(() => {
            expect(request, 'to have a call satisfying', [
              httpMethod,
              path,
              null,
              null,
              bodyParser.parseJson
            ]);
          });
      });

      it('calls request', () => {
        httpFunction(path, query, parser)
          .then(() => {
            expect(request, 'to have a call satisfying', [
              httpMethod,
              path,
              null,
              query,
              parser
            ]);
          });
      });
    };
  }

  describe('get()', describeNoBody('get', 'get'));
  describe('remove()', describeNoBody('delete', 'remove'));

  function describeWithBody(httpMethod) {
    return () => {
      let path;
      let query;
      let parser;
      let httpFunction;
      let body;

      beforeEach(() => {
        path = '/some/path';
        query = {some: 'query'};
        parser = () => {};
        body = {some: 'body'};
        httpFunction = method[httpMethod];
      });

      it('calls request with defaults', () => {
        httpFunction(path)
          .then(() => {
            expect(request, 'to have a call satisfying', [
              httpMethod,
              path,
              {},
              null,
              bodyParser.parseJson
            ]);
          });
      });

      it('calls request', () => {
        httpFunction(path, body, query, parser)
          .then(() => {
            expect(request, 'to have a call satisfying', [
              httpMethod,
              path,
              body,
              query,
              parser
            ]);
          });
      });
    };
  }

  describe('post()', describeWithBody('post'));
  describe('put()', describeWithBody('put'));
  describe('patch()', describeWithBody('patch'));
});
