import {
  getBestMultiModelOffers,
  getBestMultiModelOffersForMaterial,
  getBestMultiModelOffersForMaterialConfig,
  getBestMultiModelOffersForFinishGroup,
  isSameOffer
} from './offer'

describe('getBestMultiModelOffers()', () => {
  let shippings
  let usedShippingIds
  let materialConfigs

  beforeEach(() => {
    shippings = [
      {
        shippingId: 'shipping-1',
        vendorId: 'vendor-1',
        grossPrice: 10
      }
    ]
    usedShippingIds = []
    materialConfigs = {
      'material-config-1': {
        id: 'material-config-1',
        finishGroupId: 'finish-group-1',
        materialId: 'material-1',
        materialGroupId: 'material-group-1'
      },
      'material-config-2': {
        id: 'material-config-2',
        finishGroupId: 'finish-group-2',
        materialId: 'material-2',
        materialGroupId: 'material-group-2'
      }
    }
  })

  it('returns an empty list if no quotes were provided', () =>
    expect(
      getBestMultiModelOffers([], usedShippingIds, shippings, materialConfigs),
      'to equal',
      []
    ))

  it('returns sorted offer list', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 11,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 11,
            isPrintable: true,
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 21
        },
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 32
        },
        {
          multiModelQuote: {
            grossPrice: 44,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 54
        }
      ]
    )
  })

  it('filters not printable quotes', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: false,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 32
        }
      ]
    )
  })

  it('returns sorted offer list for multiple shippings', () => {
    shippings = [
      {
        shippingId: 'shipping-1',
        vendorId: 'vendor-1',
        grossPrice: 10
      },
      {
        shippingId: 'shipping-2',
        vendorId: 'vendor-1',
        grossPrice: 100
      }
    ]
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 32
        },
        {
          multiModelQuote: {
            grossPrice: 44,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 54
        },
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[1],
          totalGrossPrice: 122
        },
        {
          multiModelQuote: {
            grossPrice: 44,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[1],
          totalGrossPrice: 144
        }
      ]
    )
  })

  it('sorts offers based on provided used shipping id', () => {
    shippings = [
      {
        shippingId: 'shipping-1',
        vendorId: 'vendor-1',
        grossPrice: 10
      },
      {
        shippingId: 'shipping-2',
        vendorId: 'vendor-1',
        grossPrice: 100
      }
    ]
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, ['shipping-2'], shippings, materialConfigs),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[1],
          totalGrossPrice: 22
        },
        {
          multiModelQuote: {
            grossPrice: 22,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 32
        },
        {
          multiModelQuote: {
            grossPrice: 44,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[1],
          totalGrossPrice: 44
        },
        {
          multiModelQuote: {
            grossPrice: 44,
            isPrintable: true,
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 54
        }
      ]
    )
  })

  it('filters offers by materialGroupId', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 11,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs, {
        materialGroupId: 'material-group-2'
      }),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 11,
            isPrintable: true,
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 21
        }
      ]
    )
  })

  it('filters offers by materialId', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 11,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs, {
        materialId: 'material-2'
      }),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 11,
            isPrintable: true,
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 21
        }
      ]
    )
  })

  it('filters offers by finishGroupId', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 11,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs, {
        finishGroupId: 'finish-group-2'
      }),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 11,
            isPrintable: true,
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 21
        }
      ]
    )
  })

  it('filters offers by materialConfigId', () => {
    const quotes = [
      {
        grossPrice: 22,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 44,
        isPrintable: true,
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1'
      },
      {
        grossPrice: 11,
        isPrintable: true,
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1'
      }
    ]

    expect(
      getBestMultiModelOffers(quotes, usedShippingIds, shippings, materialConfigs, {
        materialConfigId: 'material-config-2'
      }),
      'to equal',
      [
        {
          multiModelQuote: {
            grossPrice: 11,
            isPrintable: true,
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-1'
          },
          shipping: shippings[0],
          totalGrossPrice: 21
        }
      ]
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
