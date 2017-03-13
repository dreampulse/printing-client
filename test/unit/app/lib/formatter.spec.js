import {formatPrice} from 'Lib/formatter'

describe('formatPrice()', () => {
  it('returns formatted string with price and currency', () => {
    expect(formatPrice(19.99, '$'), 'to equal', '19.99 $')
  })

  it('adds two 0s', () => {
    expect(formatPrice(10, '$'), 'to equal', '10.00 $')
  })

  it('rounds value down', () => {
    expect(formatPrice(19.994, '$'), 'to equal', '19.99 $')
  })

  it('rounds value up', () => {
    expect(formatPrice(19.995, '$'), 'to equal', '20.00 $')
  })
})
