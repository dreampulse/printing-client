import {
  resetModelConfigs,
  hasModelConfigWithQuote,
  setQuotesAndShippingInModelConfigs,
  updateQuotesInModelConfigs
} from './model'

describe('resetModelConfigs()', () => {
  it('clear quoteIds and shippingIds in model configs', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ]

    expect(resetModelConfigs(modelConfigs), 'to equal', [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: null,
        shippingId: null
      }
    ])
  })
})

describe('hasModelConfigWithQuote()', () => {
  it('returns true if at least one model config has a quote', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-2',
        id: 'id-2',
        quoteId: 'quote-id-2',
        shippingId: 'shipping-id-2'
      }
    ]

    expect(hasModelConfigWithQuote(modelConfigs), 'to be', true)
  })

  it('returns false if no model config has a quote', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ]

    expect(hasModelConfigWithQuote(modelConfigs), 'to be', false)
  })
})

describe('setQuotesAndShippingInModelConfigs()', () => {
  it('returns same modelConfigs if all are of type UPLOADING', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADING',
        fileId: 'file-id-2',
        id: 'id-2'
      }
    ]

    const configIds = ['id-1']

    const shipping = {
      shippingId: 'shipping-id-1'
    }

    expect(
      setQuotesAndShippingInModelConfigs(modelConfigs, configIds, [], shipping),
      'to equal',
      modelConfigs
    )
  })

  it('returns same modelConfigs if no quotes are matching by modelId', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ]

    const configIds = ['id-1', 'id-2']

    const quotes = [
      {
        quoteId: 'quote-id-1',
        modelId: 'model-id-1',
        quantity: 1
      }
    ]

    const shipping = {
      shippingId: 'shipping-id-1'
    }

    expect(
      setQuotesAndShippingInModelConfigs(modelConfigs, configIds, quotes, shipping),
      'to equal',
      modelConfigs
    )
  })

  it('returns same modelConfigs if no quotes are matching by quantity', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ]

    const configIds = ['id-1', 'id-2']

    const quotes = [
      {
        quoteId: 'quote-id-1',
        modelId: 'model-id-2',
        quantity: 2
      }
    ]

    const shipping = {
      shippingId: 'shipping-id-1'
    }

    expect(
      setQuotesAndShippingInModelConfigs(modelConfigs, configIds, quotes, shipping),
      'to equal',
      modelConfigs
    )
  })

  it('sets quoteId and shippingId on model config if modelId and quantity are matching', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ]

    const configIds = ['id-1', 'id-2']

    const quotes = [
      {
        quoteId: 'quote-id-1',
        modelId: 'model-id-2',
        quantity: 1
      },
      {
        quoteId: 'quote-id-2',
        modelId: 'model-id-2',
        quantity: 2
      }
    ]

    const shipping = {
      shippingId: 'shipping-id-1'
    }

    expect(
      setQuotesAndShippingInModelConfigs(modelConfigs, configIds, quotes, shipping),
      'to equal',
      [
        {
          type: 'UPLOADING',
          fileId: 'file-id-1',
          id: 'id-1'
        },
        {
          type: 'UPLOADED',
          quantity: 2,
          modelId: 'model-id-2',
          id: 'id-2',
          quoteId: 'quote-id-2',
          shippingId: 'shipping-id-1'
        }
      ]
    )
  })

  it('returns same modelConfigs if configIds is empty', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ]

    const quotes = [
      {
        quoteId: 'quote-id-1',
        modelId: 'model-id-2',
        quantity: 1
      },
      {
        quoteId: 'quote-id-2',
        modelId: 'model-id-2',
        quantity: 2
      }
    ]

    const shipping = {
      shippingId: 'shipping-id-1'
    }

    expect(
      setQuotesAndShippingInModelConfigs(modelConfigs, [], quotes, shipping),
      'to equal',
      modelConfigs
    )
  })
})

describe('updateQuotesInModelConfigs()', () => {
  it('updates quote id in model configs', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ]

    const newQuotes = [
      {
        quoteId: 'quote-id-2',
        modelId: 'model-id-1',
        materialConfigId: 'material-config-id-1',
        vendorId: 'vendor-id-1',
        quantity: 2,
        isPrintable: true
      }
    ]

    const quotesMap = {
      'quote-id-1': {
        quoteId: 'quote-id-1',
        modelId: 'model-id-1',
        materialConfigId: 'material-config-id-1',
        vendorId: 'vendor-id-1',
        quantity: 1,
        isPrintable: true
      }
    }

    expect(updateQuotesInModelConfigs(modelConfigs, newQuotes, quotesMap), 'to equal', [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-2',
        shippingId: 'shipping-id-1'
      }
    ])
  })

  it('does not update with quotes which are not printable', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ]

    const newQuotes = [
      {
        quoteId: 'quote-id-2',
        modelId: 'model-id-1',
        materialConfigId: 'material-config-id-1',
        vendorId: 'vendor-id-1',
        quantity: 2,
        isPrintable: false
      }
    ]

    const quotesMap = {
      'quote-id-1': {
        quoteId: 'quote-id-1',
        modelId: 'model-id-1',
        materialConfigId: 'material-config-id-1',
        vendorId: 'vendor-id-1',
        quantity: 1,
        isPrintable: true
      }
    }

    expect(updateQuotesInModelConfigs(modelConfigs, newQuotes, quotesMap), 'to equal', [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 2,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ])
  })

  it('does not update quote ids when no new quotes are matching', () => {
    const modelConfigs = [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ]

    const newQuotes = [
      {
        quoteId: 'quote-id-2',
        modelId: 'model-id-2',
        materialConfigId: 'material-config-id-2',
        vendorId: 'vendor-id-2',
        quantity: 2,
        isPrintable: true
      }
    ]

    const quotesMap = {
      'quote-id-1': {
        quoteId: 'quote-id-1',
        modelId: 'model-id-1',
        materialConfigId: 'material-config-id-1',
        vendorId: 'vendor-id-1',
        quantity: 1,
        isPrintable: true
      }
    }

    expect(updateQuotesInModelConfigs(modelConfigs, newQuotes, quotesMap), 'to equal', [
      {
        type: 'UPLOADING',
        fileId: 'file-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
      }
    ])
  })
})
