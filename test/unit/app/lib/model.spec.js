import {resetModelConfigs, hasModelConfigWithQuote} from '../../../../src/app/lib/model'

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
        modelId: 'model-id-1',
        id: 'id-1',
        quoteId: 'quote-id-1',
        shippingId: 'shipping-id-1'
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
        modelId: 'model-id-1',
        id: 'id-1'
      }
    ]

    expect(hasModelConfigWithQuote(modelConfigs), 'to be', false)
  })
})
