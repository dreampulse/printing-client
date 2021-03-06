import {getMultiModelQuotes} from './quote'

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
        grossPrice: 1,
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
        grossPrice: 10,
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
        grossPrice: 100,
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
        grossPrice: 1000,
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
        grossPrice: 101,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[0], quotes[2]]
      },
      {
        materialConfigId: 'material-config-2',
        vendorId: 'vendor-1',
        price: 1010,
        grossPrice: 1010,
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
        grossPrice: 1,
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
        grossPrice: 10,
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
        grossPrice: 11,
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
        grossPrice: 1,
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
        grossPrice: 2,
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
        grossPrice: 1,
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
        grossPrice: 2,
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
        grossPrice: 3,
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
        grossPrice: 1,
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
        grossPrice: 10,
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
        grossPrice: 1,
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
        grossPrice: 1,
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
        grossPrice: 2,
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
        grossPrice: 2,
        currency: 'USD',
        isPrintable: true,
        quotes: [quotes[1]]
      }
    ])
  })
})
