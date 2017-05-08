import AppError from 'Lib/error'

describe('Error lib', () => {
  it('sets some type', () => {
    const error = new AppError('some-error-type')
    expect(error.type, 'to equal', 'some-error-type')
  })

  it('sets some error message ', () => {
    const error = new AppError('some-error-type', 'some-message')
    expect(error.message, 'to equal', 'some-message')
  })
})
