import {
  selectModelsOfModelConfigs,
  selectCartCount,
  selectSelectedModelConfigs,
  selectModelConfigsByIds,
  selectUploadedModelConfigs,
  selectShippingsOfModelConfigs,
  selectQuotesOfModelConfigs,
  selectUniqueChosenShippings
} from '../../../../../src/app/lib/selector/model'

describe('selectModelsOfModelConfigs()', () => {
  it('returns selected models of model configs', () => {
    const state = {
      core: {
        uploadingFiles: {
          'some-file-id': {
            fileId: 'some-file-id',
            fileName: 'ome-file-name',
            fileSize: 42,
            progress: 1,
            error: false
          }
        },
        backendModels: {
          'some-model-id': {
            modelId: 'some-model-id',
            fileName: 'some-file-name',
            fileUnit: 'some-file-uni',
            area: 42,
            volume: 23,
            thumbnailUrl: 'some-url',
            sceneId: 'some-scene-id'
          }
        },
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ]
      }
    }

    const selected = [
      {
        modelId: 'some-model-id',
        fileName: 'some-file-name',
        fileUnit: 'some-file-uni',
        area: 42,
        volume: 23,
        thumbnailUrl: 'some-url',
        sceneId: 'some-scene-id'
      },
      {
        fileId: 'some-file-id',
        fileName: 'ome-file-name',
        fileSize: 42,
        progress: 1,
        error: false
      }
    ]

    expect(selectModelsOfModelConfigs(state), 'to equal', selected)
  })
})

describe('selectQuotesOfModelConfigs()', () => {
  it('returns selected quotes of model configs', () => {
    const state = {
      core: {
        quotes: {
          'quote-1': {
            quoteId: 'quote-1'
          }
        },
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ]
      }
    }

    const selected = [
      null,
      {
        quoteId: 'quote-1'
      },
      null
    ]

    expect(selectQuotesOfModelConfigs(state), 'to equal', selected)
  })
})

describe('selectShippingsOfModelConfigs()', () => {
  it('returns selected shippings of model configs', () => {
    const state = {
      core: {
        shippings: [
          {
            shippingId: 'shipping-1'
          }
        ],
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ]
      }
    }

    const selected = [
      null,
      {
        shippingId: 'shipping-1'
      },
      null
    ]

    expect(selectShippingsOfModelConfigs(state), 'to equal', selected)
  })
})

describe('selectCartCount()', () => {
  it('returns how many model are in the cart', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: 'some-quote-id', // Is in cart
            shippingId: null
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: null, // Is not in cart
            shippingId: null
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ]
      }
    }

    expect(selectCartCount(state), 'to equal', 1)
  })
})

describe('selectUploadedModelConfigs()', () => {
  it('returns all modelConfigs with type UPLOADED', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'model-id-1',
            id: 'id-1'
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'model-id-2',
            id: 'id-2'
          },
          {
            type: 'UPLOADING',
            fileId: 'file-id3',
            id: 'id-3'
          }
        ]
      }
    }

    expect(selectUploadedModelConfigs(state), 'to equal', [
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-1',
        id: 'id-1'
      },
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'model-id-2',
        id: 'id-2'
      }
    ])
  })
})

describe('selectSelectedModelConfigs()', () => {
  it('returns selected model configs', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-0',
            quoteId: 'some-quote-id',
            shippingId: null
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-1',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'config-id-2'
          }
        ],
        selectedModelConfigs: ['config-id-1']
      }
    }

    const selected = [
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'some-model-id',
        id: 'config-id-1',
        quoteId: null,
        shippingId: null
      }
    ]

    expect(selectSelectedModelConfigs(state), 'to equal', selected)
  })
})

describe('selectModelConfigsByIds()', () => {
  it('return selected model configs by id', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-0',
            quoteId: 'some-quote-id',
            shippingId: null
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-1',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'config-id-2'
          }
        ],
        selectedModelConfigs: ['config-id-1']
      }
    }

    const selected = [
      {
        type: 'UPLOADED',
        quantity: 1,
        modelId: 'some-model-id',
        id: 'config-id-1',
        quoteId: null,
        shippingId: null
      }
    ]

    expect(selectModelConfigsByIds(state, ['config-id-1']), 'to equal', selected)
  })
})

describe('selectUniqueChosenShippings()', () => {
  it('returns all shippings from model configs in cart', () => {
    const state = {
      core: {
        shippings: [
          {
            shippingId: 'shipping-1'
          },
          {
            shippingId: 'shipping-2'
          }
        ],
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-0',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-2',
            quoteId: null,
            shippingId: null
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'config-id-3'
          }
        ]
      }
    }

    const selected = [
      {
        shippingId: 'shipping-1'
      }
    ]

    expect(selectUniqueChosenShippings(state), 'to equal', selected)
  })

  it('returns every shipping just once', () => {
    const state = {
      core: {
        shippings: [
          {
            shippingId: 'shipping-1'
          },
          {
            shippingId: 'shipping-2'
          }
        ],
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-0',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'config-id-2',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          }
        ]
      }
    }

    const selected = [
      {
        shippingId: 'shipping-1'
      }
    ]

    expect(selectUniqueChosenShippings(state), 'to equal', selected)
  })
})
