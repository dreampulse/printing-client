import {
  getBestMultiModelOffersForMaterial,
  getBestMultiModelOffersForMaterialConfig,
  getBestMultiModelOffersForFinishGroup,
  isSameOffer
} from './offer'

describe('getBestMultiModelOffersForFinishGroup()', () => {
  let usedShippingIds
  let shippings
  let quotes
  let finishGroup

  beforeEach(() => {
    usedShippingIds = []
    shippings = [
      {
        shippingId: 'shipping-id',
        vendorId: 'vendor-id',
        grossPrice: 10
      }
    ]
    quotes = [
      {
        grossPrice: 42,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 23,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 10,
        isPrintable: false,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 2,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-id'
      }
    ]
    finishGroup = {
      materialConfigs: [
        {
          id: 'material-config-1'
        }
      ]
    }
  })

  it('returns the sorted offer list for the material config', () =>
    expect(
      getBestMultiModelOffersForFinishGroup(quotes, usedShippingIds, shippings, finishGroup),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 23,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id'
          },
          shipping: {shippingId: 'shipping-id', vendorId: 'vendor-id', grossPrice: 10},
          totalGrossPrice: 33
        },
        {
          multiModelQuote: {
            grossPrice: 42,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id'
          },
          shipping: {shippingId: 'shipping-id', vendorId: 'vendor-id', grossPrice: 10},
          totalGrossPrice: 52
        }
      ]
    ))

  it('returns empty an empty list if no quotes match', () =>
    expect(
      getBestMultiModelOffersForFinishGroup([], usedShippingIds, shippings, finishGroup),
      'to equal',
      []
    ))
})

describe('getBestMultiModelOffersForMaterialConfig()', () => {
  let usedShippingIds
  let shippings
  let quotes

  beforeEach(() => {
    usedShippingIds = []
    shippings = [
      {
        shippingId: 'shipping-id',
        vendorId: 'vendor-id',
        grossPrice: 10
      }
    ]
    quotes = [
      {
        grossPrice: 42,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 23,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 10,
        isPrintable: false,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 2,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-id'
      }
    ]
  })

  it('returns the sorted offer list for the material config only', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig(
        quotes,
        usedShippingIds,
        shippings,
        'material-config-1'
      ),
      'to equal',
      [
        {
          multiModelQuote: quotes[1],
          shipping: shippings[0],
          totalGrossPrice: quotes[1].grossPrice + shippings[0].grossPrice
        },
        {
          multiModelQuote: quotes[0],
          shipping: shippings[0],
          totalGrossPrice: quotes[0].grossPrice + shippings[0].grossPrice
        }
      ]
    )
  })

  it('returns empty list if no quotes provided / matched', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig([], usedShippingIds, shippings, 'material-config-1'),
      'to equal',
      []
    )
  })

  it('returns gross prices without shipping costs for used shipping ids', () => {
    expect(
      getBestMultiModelOffersForMaterialConfig(
        quotes,
        ['shipping-id'],
        shippings,
        'material-config-1'
      ),
      'to equal',
      [
        {multiModelQuote: quotes[1], shipping: shippings[0], totalGrossPrice: quotes[1].grossPrice},
        {multiModelQuote: quotes[0], shipping: shippings[0], totalGrossPrice: quotes[0].grossPrice}
      ]
    )
  })
})

describe('getBestMultiModelOffersForMaterial()', () => {
  let usedShippingIds
  let shippings
  let quotes
  let material

  beforeEach(() => {
    usedShippingIds = []
    shippings = [
      {
        shippingId: 'shipping-id',
        vendorId: 'vendor-id',
        grossPrice: 10
      }
    ]
    quotes = [
      {
        grossPrice: 42,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 23,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 10,
        isPrintable: false,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-id'
      },
      {
        grossPrice: 2,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-id'
      }
    ]
    material = {
      finishGroups: [
        {
          materialConfigs: [
            {
              id: 'material-config-1'
            }
          ]
        },
        {
          materialConfigs: [
            {
              id: 'material-config-2'
            },
            {
              id: 'material-config-3'
            }
          ]
        }
      ]
    }
  })

  it('returns the best offer for the material', () => {
    expect(
      getBestMultiModelOffersForMaterial(quotes, usedShippingIds, shippings, material),
      'to equal',
      [
        {
          multiModelQuote: quotes[3],
          shipping: shippings[0],
          totalGrossPrice: quotes[3].grossPrice + shippings[0].grossPrice
        },
        {
          multiModelQuote: quotes[1],
          shipping: shippings[0],
          totalGrossPrice: quotes[1].grossPrice + shippings[0].grossPrice
        },
        {
          multiModelQuote: quotes[0],
          shipping: shippings[0],
          totalGrossPrice: quotes[0].grossPrice + shippings[0].grossPrice
        }
      ]
    )
  })

  it('returns empty list if no quotes provided / matched', () => {
    expect(
      getBestMultiModelOffersForMaterial([], usedShippingIds, shippings, material),
      'to equal',
      []
    )
  })
})

describe('isSameOffer()', () => {
  it('returns true if the offer is the same', () => {
    const offer = {
      multiModelQuote: {
        materialConfigId: 'some-config-id-1'
      },
      shipping: {
        shippingId: 'some-shipping-id-1'
      }
    }

    expect(isSameOffer(offer, offer), 'to be true')
  })

  it('returns false if the offer differs', () => {
    const offer1 = {
      multiModelQuote: {
        materialConfigId: 'some-config-id-1'
      },
      shipping: {
        shippingId: 'some-shipping-id-1'
      }
    }

    const offer2 = {
      multiModelQuote: {
        materialConfigId: 'some-config-id-2'
      },
      shipping: {
        shippingId: 'some-shipping-id-2'
      }
    }

    expect(isSameOffer(offer1, offer2), 'to be false')
  })
})
