import {
  AppError,
  FileUploadError
} from 'Lib/error'
import {ERROR_TYPE} from '../../../../src/app/action-type'

describe('Error lib', () => {
  describe('AppError', () => {
    it('sets some type', () => {
      const error = new AppError('some-error-type')
      expect(error.type, 'to equal', 'some-error-type')
    })

    it('sets some error message ', () => {
      const error = new AppError('some-error-type', 'some-message')
      expect(error.message, 'to equal', 'some-message')
    })
  })

  describe('FileUploadError', () => {
    it('sets fileId, type and message', () => {
      const error = new FileUploadError('some-file-id')
      expect(error, 'to satisfy', {
        type: ERROR_TYPE.FILE_UPLOAD_FAILED,
        message: expect.it('to be a string'),
        fileId: 'some-file-id'
      })
    })
  })
})
