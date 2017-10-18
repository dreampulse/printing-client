import {normalizeTelephoneNumber} from 'Lib/normalize'

describe('normalizeTelephoneNumber()', () => {
  it('normalizes a telephone number', () =>
    expect(normalizeTelephoneNumber('+49 (751) 12-23'), 'to equal', '00497511223'))

  it('handles a `+`', () =>
    expect(normalizeTelephoneNumber('+49'), 'to equal', '0049'))

  it('ignores spaces', () =>
    expect(normalizeTelephoneNumber('     '), 'to equal', ''))

  it('ignores special characters', () =>
    expect(normalizeTelephoneNumber('-()/()-'), 'to equal', ''))
})
