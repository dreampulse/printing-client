import {
  formatPrice,
  formatShipping
} from 'Lib/formatter'

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

describe('formatShipping()', () => {
  it('returns formatted string for single day delivery', () => {
    expect(formatShipping({deliveryTime: '1'}), 'to equal', '1 day')
  })

  it('returns formatted string for other than single day delivery', () => {
    expect(formatShipping({deliveryTime: '2-5'}), 'to equal', '2-5 days')
  })
})
