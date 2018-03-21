// @flow

export type ErrorType =
  | 'HTTP_RESPONSE_UNEXPECTED_STATUS_ERROR'
  | 'HTTP_RESPONSE_BODY_PARSE_ERROR'
  | 'LEGACY.FILE_UPLOAD_FAILED'

// TODO: Make this private. There should be a dedicated error class for every error type
export class AppError extends Error {
  // TODO: This should just be ErrorType in the future
  type: ErrorType | string
  constructor(type: ErrorType | string, message: string) {
    super(`${message} (${type})`)
    this.type = type
  }
}

export class HttpResponseUnexpectedStatusError extends AppError {
  static type: string = 'HTTP_RESPONSE_UNEXPECTED_STATUS_ERROR'
  response: Response
  bodyText: string | null
  constructor(expectedStatus: string, response: Response, bodyText: string | null = null) {
    super(
      HttpResponseUnexpectedStatusError.type,
      `${response.url} returned with unexpected status ${response.status} ${response.statusText}. Expected status to be ${expectedStatus}.`
    )
    this.response = response
    this.bodyText = bodyText
  }
}

export class HttpResponseBodyParseError extends AppError {
  static type: string = 'HTTP_RESPONSE_BODY_PARSE_ERROR'
  response: Response
  bodyText: string | null
  constructor(cause: string, response: Response, bodyText: string | null = null) {
    super(HttpResponseBodyParseError.type, `Cannot parse response from ${response.url}: ${cause}`)
    this.response = response
    this.bodyText = bodyText
  }
}

export class FileUploadError extends AppError {
  static type: string = 'LEGACY.FILE_UPLOAD_FAILED'
  fileId: string
  constructor(fileId: string) {
    super(
      FileUploadError.type,
      'File upload failed. Maybe the file is corrupted or not in a format compatible for 3D printing.'
    )
    this.fileId = fileId
  }
}
