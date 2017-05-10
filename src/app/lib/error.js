import {ERROR_TYPE} from '../type'

export class AppError extends Error {
  constructor (type, message) {
    super(message)
    this.type = type
  }
}

export class FileUploadError extends AppError {
  constructor (fileId) {
    super(ERROR_TYPE.FILE_UPLOAD_FAILED, 'File upload failed!')
    this.fileId = fileId
  }
}
