import {
  getBestMultiModelQuote,
  getBestMultiModelQuoteForMaterialConfig,
  getBestMultiModelQuoteForMaterial,
  getMultiModelQuotes
} from '../../../../src/app/lib/quote'

describe('getBestMultiModelQuote()', () => {
  it('returns the best quote', () => {
    const quotes = [
      {
        price: 42,
        isPrintable: true
      },
      {
        price: 23,
        isPrintable: true
      },
      {
        price: 1,
        isPrintable: false
      }
    ]

    expect(getBestMultiModelQuote(quotes), 'to equal', quotes[1])
  })

  it('returns null for empty quotes', () => {
    const quotes = []

    expect(getBestMultiModelQuote(quotes), 'to equal', null)
  })
})

describe('getBestMultiModelQuoteForMaterialConfig()', () => {
  it('returns the best quote for the material config only', () => {
    const quotes = [
      {
        price: 42,
        isPrintable: true,
        materialConfigId: 'material-config-1'
      },
      {
        price: 23,
        isPrintable: true,
        materialConfigId: 'material-config-1'
      },
      {
        price: 10,
        isPrintable: false,
        materialConfigId: 'material-config-1'
      },
      {
        price: 2,
        isPrintable: true,
        materialConfigId: 'material-config-2'
      }
    ]

    expect(
      getBestMultiModelQuoteForMaterialConfig(quotes, 'material-config-1'),
      'to equal',
      quotes[1]
    )
  })
})

describe('getBestMultiModelQuoteForMaterial()', () => {
  it('returns the best quote for the materials', () => {
    const quotes = [
      {
        price: 42,
        isPrintable: true,
        materialConfigId: 'material-config-1'
      },
      {
        price: 23,
        isPrintable: true,
        materialConfigId: 'material-config-1'
      },
      {
        price: 10,
        isPrintable: false,
        materialConfigId: 'material-config-1'
      },
      {
        price: 2,
        isPrintable: true,
        materialConfigId: 'material-config-2'
      }
    ]

    const material = {
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

    expect(getBestMultiModelQuoteForMaterial(quotes, material), 'to equal', quotes[3])
  })
})

describe('getMultiModelQuotes()', () => {
  it('returns aggregated multi model quotes from given quotes', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      },
      {
        type: 'UPLOADED',
        modelId: 'model-2',
        quantity: 1
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-2',
        modelId: 'model-1',
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1',
        price: 10,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-3',
        modelId: 'model-2',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 100,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-4',
        modelId: 'model-2',
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1',
        price: 1000,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 101,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[0], quotes[2]]
      },
      {
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1',
        price: 1010,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[1], quotes[3]]
      }
    ])
  })

  it('returns not printable multi model quote if at least one quote is not printable', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      },
      {
        type: 'UPLOADED',
        modelId: 'model-2',
        quantity: 1
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-2',
        modelId: 'model-2',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 10,
        currency: 'USD',
        isPrintable: false,
        quantity: 1
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 11,
        currency: 'USD',
        isPrintable: false,
        quotes
      }
    ])
  })

  it('computes prices correctly if two modelConfigs with the same modelId are given', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      },
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 2,
        currency: 'USD',
        isPrintable: true,
        quotes
      }
    ])
  })

  it('computes prices correctly if two modelConfigs with the same modelId are given but with different quantities', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      },
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 2
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 2,
        currency: 'USD',
        isPrintable: true,
        quantity: 2
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 3,
        currency: 'USD',
        isPrintable: true,
        quotes
      }
    ])
  })

  it('filters out quotes which are not relevant for given modelConfigs', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-2',
        modelId: 'model-2',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 10,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[0]]
      }
    ])
  })

  it('returns empty array when there are no quotes', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 1
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, []), 'to equal', [])
  })

  it('filters out quotes with mismatching quantities', () => {
    const modelConfigs = [
      {
        type: 'UPLOADED',
        modelId: 'model-1',
        quantity: 2
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 1,
        currency: 'USD',
        isPrintable: true,
        quantity: 1
      },
      {
        quoteId: 'quote-1',
        modelId: 'model-1',
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 2,
        currency: 'USD',
        isPrintable: true,
        quantity: 2
      }
    ]

    expect(getMultiModelQuotes(modelConfigs, quotes), 'to equal', [
      {
        materialConfigId: 'material-config-1',
        vendorId: 'vendor-1',
        price: 2,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[1]]
      }
    ])
  })
})
