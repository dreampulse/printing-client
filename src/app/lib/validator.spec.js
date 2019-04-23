import {required, email, validateVat} from './validator'

describe('required()', () => {
  it('returns undefined if an input is provided', () =>
    expect(required('some-content'), 'to be undefined'))

  it('returns "Required" if not input is provided', () =>
    expect(required(), 'to equal', 'Required'))
})

describe('email()', () => {
  it('returns undefined if a valid email-address is provided', () =>
    expect(email('info@codastic.com'), 'to be undefined'))

  it('returns "Invalid email address" if an invalid email-address is provided', () =>
    expect(email('in---fo{}codastic.com'), 'to equal', 'Invalid email address'))
})

describe('validateVat()', () => {
  it('returns undefined if a string is provide', () =>
    expect(validateVat({}, ['DE'])('DE123'), 'to be undefined'))

  it('returns "Vat Id required" if value is empty and is is a eu country', () =>
    expect(
      validateVat(
        {
          shippingAddress: {
            countryCode: 'DE'
          }
        },
        ['DE']
      )(''),
      'to equal',
      'Vat Id required'
    ))

  it('returns undefined if value is empty and is is a eu country', () =>
    expect(
      validateVat(
        {
          shippingAddress: {
            countryCode: 'DE'
          }
        },
        ['US']
      )(''),
      'to be undefined'
    ))
})
