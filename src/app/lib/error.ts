export type ErrorType =
  | 'HTTP_RESPONSE_UNEXPECTED_STATUS_ERROR'
  | 'HTTP_RESPONSE_BODY_PARSE_ERROR'
  | 'HTTP_UPLOAD_ERROR'
  | 'PAYMENT_ABORTED_ERROR'

// TODO: Make this private. There should be a dedicated error class for every error type
export class AppError extends Error {
  // TODO: This should just be ErrorType in the future
  private type: ErrorType | string
  constructor(type: ErrorType | string, message: string) {
    super(`${message} (${type})`)
    this.type = type
  }
}

export class PaymentAbortedError extends AppError {
  public static TYPE: string = 'PAYMENT_ABORTED_ERROR'

  constructor() {
    super(PaymentAbortedError.TYPE, 'Payment aborted by user.')
  }
}

export class HttpResponseUnexpectedStatusError extends AppError {
  public static TYPE: string = 'HTTP_RESPONSE_UNEXPECTED_STATUS_ERROR'
  private response: Response
  private bodyText: string | null
  constructor(expectedStatus: string, response: Response, bodyText: string | null = null) {
    super(
      HttpResponseUnexpectedStatusError.TYPE,
      `${response.url} returned with unexpected status ${response.status} ${
        response.statusText
      }. Expected status to be ${expectedStatus}.`
    )
    this.response = response
    this.bodyText = bodyText
  }
}

export class HttpResponseBodyParseError extends AppError {
  public static TYPE = 'HTTP_RESPONSE_BODY_PARSE_ERROR'
  private response: Response
  private bodyText: string | null
  constructor(cause: string, response: Response, bodyText: string | null = null) {
    super(HttpResponseBodyParseError.TYPE, `Cannot parse response from ${response.url}: ${cause}`)
    this.response = response
    this.bodyText = bodyText
  }
}

export enum HttpUploadErrorPhase {
  UPLOADING = 'UPLOADING',
  DOWNLOADING = 'DOWNLOADING'
}
export class HttpUploadError extends AppError {
  public static TYPE = 'HTTP_UPLOAD_ERROR'

  private url: string
  private phase: HttpUploadErrorPhase
  constructor(method: string, url: string, during: HttpUploadErrorPhase) {
    super(
      HttpUploadError.TYPE,
      `${method} ${url} failed ${
        during === HttpUploadErrorPhase.UPLOADING
          ? 'during upload'
          : 'after upload while downloading the response'
      }.`
    )
    this.url = url
    this.phase = during
  }
}
