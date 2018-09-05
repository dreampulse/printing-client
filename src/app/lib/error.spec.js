import {
  AppError,
  HttpResponseUnexpectedStatusError,
  HttpResponseBodyParseError,
  HttpUploadError
} from './error'

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

  describe('HttpUploadError', () => {
    describe('in uploading phase', () => {
      it('sets method, url and phase', () => {
        const error = new HttpUploadError(
          'POST',
          'http://example.com',
          HttpUploadError.PHASE_UPLOADING
        )
        expect(error, 'to satisfy', {
          type: 'HTTP_UPLOAD_ERROR',
          message: expect.it('to contain', 'POST http://example.com failed during upload'),
          url: 'http://example.com',
          phase: 'UPLOADING'
        })
      })
    })
    describe('in downloading phase', () => {
      it('sets method, url and phase', () => {
        const error = new HttpUploadError(
          'POST',
          'http://example.com',
          HttpUploadError.PHASE_DOWNLOADING
        )
        expect(error, 'to satisfy', {
          type: 'HTTP_UPLOAD_ERROR',
          message: expect.it(
            'to contain',
            'POST http://example.com failed after upload while downloading the response'
          ),
          url: 'http://example.com',
          phase: 'DOWNLOADING'
        })
      })
    })
  })
})
