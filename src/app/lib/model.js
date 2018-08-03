// @flow

import type {ModelConfig, Quote, Shipping} from '../type-next'

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

export const setQuotesAndShippingInModelConfigs = (
  modelConfigs: Array<ModelConfig>,
  quotes: Array<Quote>,
  shipping: Shipping
) =>
  modelConfigs.map(modelConfig => {
    if (modelConfig.type === 'UPLOADED') {
      // Only the pair of modelId and quantity makes a match distinctive
      const {modelId, quantity} = modelConfig
      const quote = quotes.find(q => q.modelId === modelId && q.quantity === quantity)
      if (!quote) {
        return modelConfig
      }

      return {
        ...modelConfig,
        quoteId: quote.quoteId,
        shippingId: shipping.shippingId
      }
    }

    // Nothing todo in this case
    return modelConfig
  })
