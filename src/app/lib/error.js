import {ERROR_TYPE} from '../action-type'

export class AppError extends Error {
  constructor (type, message) {
    super(message)
    this.type = type
  }
}

export class FileUploadError extends AppError {
  constructor (fileId) {
    super(ERROR_TYPE.FILE_UPLOAD_FAILED, 'File upload failed. Maybe the file is corrupted or not in a format compatible for 3D printing.')
    this.fileId = fileId
  }
}
