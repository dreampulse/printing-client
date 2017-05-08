
export class AppError extends Error {
  constructor (type, message) {
    super(message)
    this.type = type
  }
}
