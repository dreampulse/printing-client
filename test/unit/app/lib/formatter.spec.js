import {
  formatPrice,
  formatDeliveryTime,
  formatAddress,
  formatDimensions,
  formatTimeRange
} from '../../../../src/app/lib/formatter'

describe('formatPrice()', () => {
  it('returns formatted string with price and currency USD', () => {
    expect(formatPrice(19.99, 'USD'), 'to equal', '$19.99')
  })

  it('returns formatted string with price and currency EUR', () => {
    expect(formatPrice(19.99, 'EUR'), 'to equal', '19.99€')
  })

  it('returns formatted string with price and currency GBP', () => {
    expect(formatPrice(19.99, 'GBP'), 'to equal', '£19.99')
  })

  it('returns formatted string with price and currency CAD', () => {
    expect(formatPrice(19.99, 'CAD'), 'to equal', 'CDN$19.99')
  })

  it('returns formatted string with price and currency AUD', () => {
    expect(formatPrice(19.99, 'AUD'), 'to equal', 'AU$19.99')
  })

  it('returns formatted string with price and unsupported currency', () => {
    expect(formatPrice(19.99, 'ZAR', true), 'to equal', 'ZAR19.99')
  })

  it('adds two 0s', () => {
    expect(formatPrice(10, 'USD'), 'to equal', '$10.00')
  })

  it('rounds value down', () => {
    expect(formatPrice(19.994, 'USD'), 'to equal', '$19.99')
  })

  it('rounds value up', () => {
    expect(formatPrice(19.995, 'USD'), 'to equal', '$20.00')
  })
})

describe('formatDeliveryTime()', () => {
  it('returns formatted string for single day delivery', () => {
    expect(formatDeliveryTime('1'), 'to equal', '1 day')
  })

  it('returns formatted string for other than single day delivery', () => {
    expect(formatDeliveryTime('2-5'), 'to equal', '2-5 days')
  })
})

describe('formatTimeRange()', () => {
  it('returns formatted string for single value', () => {
    expect(formatTimeRange(1), 'to equal', '1 day')
  })

  it('returns formatted string for same values', () => {
    expect(formatTimeRange(1, 1), 'to equal', '1 day')
  })

  it('returns formatted string for single value lager 1', () => {
    expect(formatTimeRange(2), 'to equal', '2 days')
  })

  it('returns formatted string for same values lager 1', () => {
    expect(formatTimeRange(2, 2), 'to equal', '2 days')
  })

  it('returns formatted string for different values', () => {
    expect(formatTimeRange(1, 2), 'to equal', '1-2 days')
  })

  it('returns formatted string for string values', () => {
    expect(formatTimeRange('1', '2'), 'to equal', '1-2 days')
  })

  it('returns `–` if there are no arguments', () => {
    expect(formatTimeRange(), 'to equal', '–')
  })

  it('returns `–` if from is undefined', () => {
    expect(formatTimeRange(undefined), 'to equal', '–')
  })

  it('returns `–` if from and to are undefined', () => {
    expect(formatTimeRange(undefined, undefined), 'to equal', '–')
  })
})

describe('formatAddress', () => {
  it('returns formatted string', () => {
    expect(
      formatAddress({
        city: 'Ulm',
        countryCode: 'DE',
        something: 'else'
      }),
      'to equal',
      'Ulm, Germany'
    )
  })

  it('returns an empty string if some key is missing', () => {
    expect(
      formatAddress({
        countryCode: 'DE'
      }),
      'to equal',
      ''
    )
  })
})

describe('formatDimensions', () => {
  it('returns string for 2-dimensional object', () => {
    expect(formatDimensions({x: 1, y: 2}, 'mm'), 'to equal', '1 × 2 mm')
  })

  it('returns string for 3-dimensional object', () => {
    expect(formatDimensions({x: 1, y: 2, z: 3}, 'mm'), 'to equal', '1 × 2 × 3 mm')
  })

  it('rounds to at most 2 decimal places', () => {
    expect(formatDimensions({x: 1.5, y: 2.05, z: 3.005}, 'mm'), 'to equal', '1.5 × 2.05 × 3.01 mm')
  })

  it('returns null if all parameter are undefined', () => {
    expect(formatDimensions({x: null, y: null, z: null}), 'to be null')
  })
})
