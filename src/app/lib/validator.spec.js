import {required, email} from './validator'

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
