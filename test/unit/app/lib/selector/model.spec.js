import {
  selectModelsOfModelConfigs,
  selectCartCount,
  selectSelectedModelConfigs,
  selectModelConfigsByIds
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
