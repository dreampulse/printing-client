import $bodyParser from '../../../../../../src/app/lib/api/http/body-parser';

describe('http bodyParser', () => {
  let response;
  let bodyParser;
  let jsonResponse;

  beforeEach(() => {
    jsonResponse = {
      someKey: 'some_value'
    };
    response = {
      json: sinon.stub().resolves(jsonResponse),
      text: sinon.stub().resolves('some_text')
    };
    bodyParser = $bodyParser();
  });

  describe('parseText()', () => {
    it('parses the response body', () => {
      return bodyParser.parseText(response)
        .then((body) => {
          expect(body, 'to equal', 'some_text');
        });
    });
  });

  describe('parseJson()', () => {
    it('parses the response body', () => {
      return bodyParser.parseJson(response)
        .then((body) => {
          expect(body, 'to equal', {
            someKey: 'some_value'
          });
        });
    });

    it('camelizes the body object', () => {
      delete jsonResponse.someKey;
      jsonResponse.some_other_key = 'some_other_key';
      return bodyParser.parseJson(response)
        .then((body) => {
          expect(body, 'to equal', {
            someOtherKey: 'some_other_key'
          });
        });
    });
  });
});
