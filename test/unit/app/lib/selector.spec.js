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
  isQuotePollingDone,
  selectQuotePollingProgress,
  selectQuotes,
  selectUsedShippingIdsAndFilter
} from '../../../../src/app/lib/selector'

import * as materialLib from '../../../../src/app/lib/material'

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
        materialGroups: [
          {
            id: 'material-group-1',
            materials: [
              {
                id: 'material-1',
                finishGroups: [
                  {
                    id: 'finish-group-1',
                    materialConfigs: [
                      {
                        id: 'material-config-1',
                        finishGroupId: 'finish-group-1',
                        materialId: 'material-1',
                        materialGroupId: 'material-group-1'
                      }
                    ]
                  }
                ]
              },
              {
                id: 'material-2',
                finishGroups: [
                  {
                    id: 'finish-group-2',
                    materialConfigs: [
                      {
                        id: 'material-config-2',
                        finishGroupId: 'finish-group-2',
                        materialId: 'material-2',
                        materialGroupId: 'material-group-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'material-group-3',
            materials: [
              {
                id: 'material-3',
                finishGroups: [
                  {
                    id: 'finish-group-3',
                    materialConfigs: [
                      {
                        id: 'material-config-3',
                        finishGroupId: 'finish-group-3',
                        materialId: 'material-3',
                        materialGroupId: 'material-group-3'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
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

describe('selectCommonMaterialPathOfModelConfigs()', () => {
  let state
  let sandbox

  beforeEach(() => {
    state = {
      core: {
        materialGroups: [
          {
            id: 'material-group-1',
            materials: [
              {
                id: 'material-1',
                finishGroups: [
                  {
                    id: 'finish-group-1',
                    materialConfigs: [
                      {
                        id: 'material-config-1',
                        finishGroupId: 'finish-group-1',
                        materialId: 'material-1',
                        materialGroupId: 'material-group-1'
                      }
                    ]
                  }
                ]
              },
              {
                id: 'material-2',
                finishGroups: [
                  {
                    id: 'finish-group-2',
                    materialConfigs: [
                      {
                        id: 'material-config-2',
                        finishGroupId: 'finish-group-2',
                        materialId: 'material-2',
                        materialGroupId: 'material-group-1'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'material-group-3',
            materials: [
              {
                id: 'material-3',
                finishGroups: [
                  {
                    id: 'finish-group-3',
                    materialConfigs: [
                      {
                        id: 'material-config-3',
                        finishGroupId: 'finish-group-3',
                        materialId: 'material-3',
                        materialGroupId: 'material-group-3'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
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

    sandbox = sinon.sandbox.create()

    sandbox.stub(materialLib, 'getMaterialTreeByMaterialConfigId').returns({
      materialConfig: {
        id: 'material-config-id',
        colorCode: 'color-code',
        color: 'color',
        colorImage: 'color-image'
      },
      finishGroup: {
        properties: {
          printingMethodShort: 'printing-method',
          printingServiceName: {
            'vendor-id-1': 'provider-info',
            'vendor-id-2': 'provider-info-2'
          }
        }
      }
    })
  })

  afterEach(() => {
    sandbox.restore()
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
        process: 'printing-method',
        providerInfo: 'provider-info',
        materialConfigId: 'material-config-id',
        colorCode: 'color-code',
        color: 'color',
        colorImage: 'color-image'
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
        process: 'printing-method',
        providerInfo: 'provider-info-2',
        materialConfigId: 'material-config-id',
        colorCode: 'color-code',
        color: 'color',
        colorImage: 'color-image'
      }
    ])
  })
})
describe('isQuotePollingDone()', () => {
  it('returns false when quote polling is not done', () => {
    const state = {
      core: {
        quotePollingId: 'some-polling-id'
      }
    }

    expect(isQuotePollingDone(state), 'to equal', false)
  })

  it('returns true when quote polling is done', () => {
    const state = {
      core: {
        quotePollingId: null
      }
    }

    expect(isQuotePollingDone(state), 'to equal', true)
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
