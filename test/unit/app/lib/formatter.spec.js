import {
  formatPrice,
  formatDeliveryTime,
  formatAddress,
  formatDimensions,
  formatProviderName,
  formatFinishGroupProviderNames
} from '../../../../src/app/lib/formatter'

import config from '../../../../config/index'

describe('formatPrice()', () => {
  it('returns formatted string with price and currency USD', () => {
    expect(formatPrice(19.99, 'USD'), 'to equal', '$19.99')
  })

  it('returns formatted string with price and currency EUR', () => {
    expect(formatPrice(19.99, 'EUR'), 'to equal', '€19.99')
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

describe('formatProviderName()', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(config, 'providerNames').value({
      providerSlug1: 'providerName1',
      providerSlug2: 'providerName2'
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the provider name for a given provider slug', () => {
    expect(formatProviderName('providerSlug1'), 'to equal', 'providerName1')
  })

  it('returns the provider slug as fallback', () => {
    expect(formatProviderName('providerSlugX'), 'to equal', 'providerSlugX')
  })
})

describe('formatFinishGroupProviderNames()', () => {
  let sandbox
  let finishGroupProviderNames

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    sandbox.stub(config, 'providerNames').value({
      providerSlug1: 'providerName1',
      providerSlug2: 'providerName2'
    })

    finishGroupProviderNames = {
      providerSlug1: ['name1', 'name4'],
      providerSlug2: ['name2']
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('returns the provider name for a given provider slug', () => {
    expect(formatFinishGroupProviderNames(finishGroupProviderNames), 'to equal', {
      providerName1: ['name1', 'name4'],
      providerName2: ['name2']
    })
  })
})
