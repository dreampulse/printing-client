// @flow

import type {ModelConfig} from '../type-next'

export const resetModelConfigs = (modelConfigs: Array<ModelConfig>) =>
  modelConfigs.map(modelConfig => {
    if (modelConfig.type === 'UPLOADED') {
      return {
        ...modelConfig,
        quoteId: null,
        shippingId: null
      }
    }
    return modelConfig
  })

export const hasModelConfigWithQuote = (modelConfigs: Array<ModelConfig>) =>
  modelConfigs.some(modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId)
