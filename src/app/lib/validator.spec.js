import {required, email, vat} from './validator'

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

describe('vat()', () => {
  it('returns undefined if a string is provide', () =>
    expect(vat(null, ['DE'])('DE123'), 'to be undefined'))

  it('returns "Vat Id required" if value is empty and it is a eu country', () =>
    expect(vat('DE', ['DE'])(''), 'to equal', 'Vat Id required'))

  it('returns undefined if value is empty and it is a eu country', () =>
    expect(vat('DE', ['US'])(''), 'to be undefined'))
})
