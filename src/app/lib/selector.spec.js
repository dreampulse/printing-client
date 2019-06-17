import {
  selectModelsOfModelConfigs,
  selectCartCount,
  selectSelectedModelConfigs,
  selectModelConfigsByIds,
  selectUploadedModelConfigs,
  selectShippingsOfModelConfigs,
  selectQuotesOfModelConfigs,
  selectCartShippings,
  selectCommonMaterialPathOfModelConfigs,
  selectConfiguredModelInformation,
  selectQuotePollingProgress,
  selectQuotes,
  selectUsedShippingIdsAndFilter,
  hasOnlyValidModelConfigsWithQuote,
  isCartUpToDate
} from './selector'

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

describe('selectCartShippings()', () => {
  it('returns all shippings from cart', () => {
    const state = {
      core: {
        shippings: [
          {
            shippingId: 'shipping-1'
          },
          {
            shippingId: 'shipping-2'
          },
          {
            shippingId: 'shipping-3'
          }
        ],
        cart: {
          shippingIds: ['shipping-1', 'shipping-3']
        }
      }
    }

    const selected = [
      {
        shippingId: 'shipping-1'
      },
      {
        shippingId: 'shipping-3'
      }
    ]

    expect(selectCartShippings(state), 'to equal', selected)
  })

  it('returns empty array if there is no cart', () => {
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
        cart: null
      }
    }

    expect(selectCartShippings(state), 'to equal', [])
  })
})

describe('selectCommonMaterialPathOfModelConfigs()', () => {
  let state

  beforeEach(() => {
    state = {
      core: {
        materialConfigs: {
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
            materialGroupId: 'material-group-1'
          },
          'material-config-3': {
            id: 'material-config-3',
            finishGroupId: 'finish-group-3',
            materialId: 'material-3',
            materialGroupId: 'material-group-3'
          }
        },
        quotes: {
          'quote-1': {
            materialConfigId: 'material-config-1'
          },
          'quote-2': {
            materialConfigId: 'material-config-1'
          },
          'quote-3': {
            materialConfigId: 'material-config-2'
          },
          'quote-4': {
            materialConfigId: 'material-config-3'
          }
        },
        modelConfigs: [
          {
            type: 'UPLOADED',
            id: 'model-config-1',
            quoteId: 'quote-1'
          },
          {
            type: 'UPLOADED',
            id: 'model-config-2',
            quoteId: 'quote-2'
          },
          {
            type: 'UPLOADED',
            id: 'model-config-3',
            quoteId: 'quote-3'
          },
          {
            type: 'UPLOADED',
            id: 'model-config-4',
            quoteId: 'quote-4'
          },
          {
            type: 'UPLOADING',
            id: 'model-config-5'
          },
          {
            type: 'UPLOADED',
            id: 'model-config-6',
            quoteId: null
          }
        ]
      }
    }
  })

  it('returns common material path when all material config ids are the same', () => {
    const selected = {
      materialConfigId: 'material-config-1',
      finishGroupId: 'finish-group-1',
      materialId: 'material-1',
      materialGroupId: 'material-group-1'
    }

    expect(
      selectCommonMaterialPathOfModelConfigs(state, ['model-config-1', 'model-config-2']),
      'to equal',
      selected
    )
  })

  it('returns null for all values if there is no common path', () => {
    const selected = {
      materialConfigId: null,
      finishGroupId: null,
      materialId: null,
      materialGroupId: null
    }

    expect(
      selectCommonMaterialPathOfModelConfigs(state, ['model-config-1', 'model-config-4']),
      'to equal',
      selected
    )
  })

  it('returns common path as far as possible', () => {
    const selected = {
      materialConfigId: null,
      finishGroupId: null,
      materialId: null,
      materialGroupId: 'material-group-1'
    }

    expect(
      selectCommonMaterialPathOfModelConfigs(state, ['model-config-1', 'model-config-3']),
      'to equal',
      selected
    )
  })

  it('ignores modelConfig of type UPLOADING', () => {
    const selected = {
      materialConfigId: 'material-config-1',
      finishGroupId: 'finish-group-1',
      materialId: 'material-1',
      materialGroupId: 'material-group-1'
    }

    expect(
      selectCommonMaterialPathOfModelConfigs(state, ['model-config-1', 'model-config-5']),
      'to equal',
      selected
    )
  })

  it('ignores modelConfig without quote', () => {
    const selected = {
      materialConfigId: 'material-config-1',
      finishGroupId: 'finish-group-1',
      materialId: 'material-1',
      materialGroupId: 'material-group-1'
    }

    expect(
      selectCommonMaterialPathOfModelConfigs(state, ['model-config-1', 'model-config-6']),
      'to equal',
      selected
    )
  })

  it('handles empty array', () => {
    const selected = {
      materialConfigId: null,
      finishGroupId: null,
      materialId: null,
      materialGroupId: null
    }

    expect(selectCommonMaterialPathOfModelConfigs(state, []), 'to equal', selected)
  })
})

describe('selectConfiguredModelInformation()', () => {
  let state

  beforeEach(() => {
    state = {
      core: {
        materialConfigs: {
          'material-config-1': {
            id: 'material-config-1',
            finishGroupId: 'finish-group-1',
            materialId: 'material-1',
            printingService: {
              'vendor-id-1': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              },
              'vendor-id-2': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              }
            },
            materialGroupId: 'material-group-1',
            colorCode: 'color-code',
            color: 'color',
            colorImage: 'color-image'
          },
          'material-config-2': {
            id: 'material-config-2',
            finishGroupId: 'finish-group-2',
            materialId: 'material-2',
            printingService: {
              'vendor-id-1': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              },
              'vendor-id-2': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              }
            },
            materialGroupId: 'material-group-1',
            colorCode: 'color-code',
            color: 'color',
            colorImage: 'color-image'
          },
          'material-config-3': {
            id: 'material-config-3',
            finishGroupId: 'finish-group-3',
            materialId: 'material-3',
            printingService: {
              'vendor-id-1': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              },
              'vendor-id-2': {
                productionTimeFast: 3,
                productionTimeSlow: 4
              }
            },
            materialGroupId: 'material-group-3',
            colorCode: 'color-code',
            color: 'color',
            colorImage: 'color-image'
          }
        },
        finishGroups: {
          'finish-group-1': {
            id: 'finish-group-1',
            name: 'finish-group-name',
            properties: {
              printingServiceName: {
                'vendor-id-1': 'provider-info',
                'vendor-id-2': 'provider-info-2'
              }
            },
            materialConfigs: [
              {
                id: 'material-config-1',
                finishGroupId: 'finish-group-1',
                materialId: 'material-1',
                materialGroupId: 'material-group-1'
              }
            ]
          },
          'finish-group-2': {
            id: 'finish-group-2',
            name: 'finish-group-name',
            properties: {
              printingServiceName: {
                'vendor-id-1': 'provider-info',
                'vendor-id-2': 'provider-info-2'
              }
            },
            materialConfigs: [
              {
                id: 'material-config-2',
                finishGroupId: 'finish-group-2',
                materialId: 'material-2',
                materialGroupId: 'material-group-1'
              }
            ]
          },
          'finish-group-3': {
            id: 'finish-group-3',
            name: 'finish-group-name',
            properties: {
              printingServiceName: {
                'vendor-id-1': 'provider-info',
                'vendor-id-2': 'provider-info-2'
              }
            },
            materialConfigs: [
              {
                id: 'material-config-3',
                finishGroupId: 'finish-group-3',
                materialId: 'material-3',
                materialGroupId: 'material-group-3'
              }
            ]
          }
        },
        quotes: {
          'quote-1': {
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id-1'
          },
          'quote-2': {
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id-2'
          }
        },
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
            id: 'some-config-id',
            quoteId: 'quote-1',
            shippingId: 'shipping-2'
          },
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: 'quote-2',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ],
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
        }
      }
    }
  })

  it('returns all informations about all configured models', () => {
    expect(selectConfiguredModelInformation(state), 'to equal', [
      {
        modelConfig: {
          type: 'UPLOADED',
          quantity: 1,
          modelId: 'some-model-id',
          id: 'some-config-id',
          quoteId: 'quote-1',
          shippingId: 'shipping-2'
        },
        model: {
          modelId: 'some-model-id',
          fileName: 'some-file-name',
          fileUnit: 'some-file-uni',
          area: 42,
          volume: 23,
          thumbnailUrl: 'some-url',
          sceneId: 'some-scene-id'
        },
        shipping: {shippingId: 'shipping-2'},
        quote: {
          materialConfigId: 'material-config-1',
          vendorId: 'vendor-id-1'
        },
        finishGroupName: 'finish-group-name',
        providerInfo: 'provider-info',
        materialConfigId: 'material-config-1',
        colorCode: 'color-code',
        color: 'color',
        colorImage: 'color-image',
        productionTimeFast: 3,
        productionTimeSlow: 4
      },
      {
        modelConfig: {
          type: 'UPLOADED',
          quantity: 1,
          modelId: 'some-model-id',
          id: 'some-config-id',
          quoteId: 'quote-2',
          shippingId: 'shipping-1'
        },
        model: {
          modelId: 'some-model-id',
          fileName: 'some-file-name',
          fileUnit: 'some-file-uni',
          area: 42,
          volume: 23,
          thumbnailUrl: 'some-url',
          sceneId: 'some-scene-id'
        },
        shipping: {shippingId: 'shipping-1'},
        quote: {
          materialConfigId: 'material-config-1',
          vendorId: 'vendor-id-2'
        },
        finishGroupName: 'finish-group-name',
        providerInfo: 'provider-info-2',
        materialConfigId: 'material-config-1',
        colorCode: 'color-code',
        color: 'color',
        colorImage: 'color-image',
        productionTimeFast: 3,
        productionTimeSlow: 4
      }
    ])
  })
})

describe('selectQuotePollingProgress()', () => {
  it('returns the current progress of the polling of the quotes', () => {
    const state = {
      core: {
        printingServiceComplete: {
          'service-1': true,
          'service-2': false,
          'service-3': true
        }
      }
    }

    expect(selectQuotePollingProgress(state), 'to equal', {
      complete: 2,
      total: 3
    })
  })

  it('returns complete 1 if only one service is completed', () => {
    const state = {
      core: {
        printingServiceComplete: {
          'service-1': true,
          'service-2': false,
          'service-3': false
        }
      }
    }

    expect(selectQuotePollingProgress(state), 'to equal', {
      complete: 1,
      total: 3
    })
  })
})

describe('selectQuotes()', () => {
  it('returns the quotes', () => {
    const state = {
      core: {
        quotes: {
          'some-id-1': 'some-quote-1',
          'some-id-2': 'some-quote-2'
        }
      }
    }

    expect(selectQuotes(state), 'to equal', ['some-quote-1', 'some-quote-2'])
  })
})

describe('selectUsedShippingIdsAndFilter()', () => {
  it('returns all shipping ids', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-2'
          }
        ]
      }
    }

    expect(selectUsedShippingIdsAndFilter(state), 'to equal', ['shipping-1', 'shipping-2'])
  })

  it('removes empty values from return list', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: null
          },
          {
            id: 'config-3',
            type: 'UPLOADING',
            shippingId: null
          }
        ]
      }
    }

    expect(selectUsedShippingIdsAndFilter(state), 'to equal', ['shipping-1'])
  })

  it('removes duplicates from return list', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          }
        ]
      }
    }

    expect(selectUsedShippingIdsAndFilter(state), 'to equal', ['shipping-1'])
  })

  it('excludes given model config ids', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            id: 'config-1',
            type: 'UPLOADED',
            shippingId: 'shipping-1'
          },
          {
            id: 'config-2',
            type: 'UPLOADED',
            shippingId: 'shipping-2'
          }
        ]
      }
    }

    expect(selectUsedShippingIdsAndFilter(state, ['config-2']), 'to equal', ['shipping-1'])
  })
})

describe('hasOnlyValidModelConfigsWithQuote()', () => {
  it('returns true if there are no model configs', () => {
    const state = {
      core: {
        modelConfigs: [],
        quotes: {}
      }
    }

    expect(hasOnlyValidModelConfigsWithQuote(state), 'to be', true)
  })

  it('returns true if there are no model configs with quotes', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'some-config-id',
            quoteId: null,
            shippingId: null
          }
        ],
        quotes: {}
      }
    }

    expect(hasOnlyValidModelConfigsWithQuote(state), 'to be', true)
  })

  it('returns true if there are no uploaded model configs', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADING',
            fileId: 'some-file-id',
            id: 'some-config-id'
          }
        ],
        quotes: {}
      }
    }

    expect(hasOnlyValidModelConfigsWithQuote(state), 'to be', true)
  })

  it('returns true if all model configs with quotes have same quantity as in quote', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'material-config-1',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          }
        ],
        quotes: {
          'quote-1': {
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id-1',
            quantity: 1
          }
        },
        shippings: [
          {
            shippingId: 'shipping-1'
          }
        ]
      }
    }

    expect(hasOnlyValidModelConfigsWithQuote(state), 'to be', true)
  })

  it('returns false if at least one model config with quotes does not havae the same quantity as in the quote', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'material-config-1',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADED',
            quantity: 2,
            modelId: 'some-model-id',
            id: 'material-config-2',
            quoteId: 'quote-2',
            shippingId: 'shipping-2'
          }
        ],
        quotes: {
          'quote-1': {
            materialConfigId: 'material-config-1',
            vendorId: 'vendor-id-1',
            quantity: 2
          },
          'quote-2': {
            materialConfigId: 'material-config-2',
            vendorId: 'vendor-id-2',
            quantity: 2
          }
        },
        shippings: [
          {
            shippingId: 'shipping-1'
          },
          {
            shippingId: 'shipping-1'
          }
        ]
      }
    }

    expect(hasOnlyValidModelConfigsWithQuote(state), 'to be', false)
  })
})

describe('isCartUpToDate()', () => {
  it('returns false if there is no cart', () => {
    const state = {
      core: {
        modelConfigs: [],
        cart: null
      }
    }

    expect(isCartUpToDate(state), 'to be', false)
  })

  it('returns false if cart has other quote ids than model configs', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'material-config-1',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          }
        ],
        cart: {
          quoteIds: ['quote-2']
        }
      }
    }

    expect(isCartUpToDate(state), 'to be', false)
  })

  it('returns true if cart has same quote ids than model configs', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'material-config-1',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          }
        ],
        cart: {
          quoteIds: ['quote-1']
        }
      }
    }

    expect(isCartUpToDate(state), 'to be', true)
  })

  it('returns true if cart has same quote ids than uploaded model configs', () => {
    const state = {
      core: {
        modelConfigs: [
          {
            type: 'UPLOADED',
            quantity: 1,
            modelId: 'some-model-id',
            id: 'material-config-1',
            quoteId: 'quote-1',
            shippingId: 'shipping-1'
          },
          {
            type: 'UPLOADING'
          }
        ],
        cart: {
          quoteIds: ['quote-1']
        }
      }
    }

    expect(isCartUpToDate(state), 'to be', true)
  })
})
