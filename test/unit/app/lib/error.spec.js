import {
  AppError,
  HttpResponseUnexpectedStatusError,
  HttpResponseBodyParseError,
  FileUploadError
} from '../../../../src/app/lib/error'

describe('Error lib', () => {
  describe('AppError', () => {
    it('sets some type', () => {
      const error = new AppError('some-error-type')
      expect(error.type, 'to equal', 'some-error-type')
    })

    it('sets some error message ', () => {
      const error = new AppError('some-error-type', 'some-message')
      expect(error.message, 'to equal', 'some-message (some-error-type)')
    })
  })

  describe('HttpResponseUnexpectedStatusError', () => {
    it('sets type, message, response and bodyText', () => {
      const response = {
        status: 400,
        statusText: 'Bad Request',
        url: 'http://example.com'
      }
      const error = new HttpResponseUnexpectedStatusError('2xx', response, 'Server error')
      expect(error, 'to satisfy', {
        type: 'HTTP_RESPONSE_UNEXPECTED_STATUS_ERROR',
        message: expect.it(
          'to contain',
          'http://example.com returned with unexpected status 400 Bad Request. Expected status to be 2xx.'
        ),
        response,
        bodyText: 'Server error'
      })
    })
    it('sets bodyText null as default', () => {
      const error = new HttpResponseUnexpectedStatusError('2xx', {
        status: 400,
        statusText: 'Bad Request',
        url: 'http://example.com'
      })
      expect(error.bodyText, 'to be', null)
    })
  })

  describe('HttpResponseBodyParseError', () => {
    it('sets type, message, response and bodyText', () => {
      const response = {
        url: 'http://example.com'
      }
      const error = new HttpResponseBodyParseError('Unexpected token', response, '{')
      expect(error, 'to satisfy', {
        type: 'HTTP_RESPONSE_BODY_PARSE_ERROR',
        message: expect.it(
          'to contain',
          'Cannot parse response from http://example.com: Unexpected token'
        ),
        response,
        bodyText: '{'
      })
    })
    it('sets bodyText null as default', () => {
      const error = new HttpResponseBodyParseError('Unexpected token', {
        url: 'http://example.com'
      })
      expect(error.bodyText, 'to be', null)
    })
  })

  describe('FileUploadError', () => {
    it('sets type, message and fileId', () => {
      const error = new FileUploadError('some-file-id')
      expect(error, 'to satisfy', {
        type: 'LEGACY.FILE_UPLOAD_FAILED',
        message: expect.it(
          'to contain',
          'File upload failed. Maybe the file is corrupted or not in a format compatible for 3D printing.'
        ),
        fileId: 'some-file-id'
      })
    })
  })
})
