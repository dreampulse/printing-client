import keyBy from 'lodash/keyBy'

import {ModelConfig, Quote, Shipping, ConfigId, QuoteId} from '../type'

export const resetModelConfigs = (modelConfigs: ModelConfig[]): ModelConfig[] =>
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

export const hasModelConfigWithQuote = (modelConfigs: ModelConfig[]) =>
  modelConfigs.some(modelConfig => modelConfig.type === 'UPLOADED' && !!modelConfig.quoteId)

export const setQuotesAndShippingInModelConfigs = (
  modelConfigs: ModelConfig[],
  configIds: ConfigId[],
  quotes: Quote[],
  shipping: Shipping
) => {
  const configIdMap = keyBy(configIds, id => id)

  return modelConfigs.map(modelConfig => {
    if (modelConfig.type === 'UPLOADED' && configIdMap[modelConfig.id]) {
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
}

// Update quoteIds if quantities changed in configured modelConfigs.
// This happens when quantites are changed on cart or edit material page.
export const updateQuotesInModelConfigs = (
  modelConfigs: ModelConfig[],
  newQuotes: Quote[],
  quotesMap: {[quoteId: string]: Quote}
): ModelConfig[] =>
  modelConfigs.map(modelConfig => {
    if (modelConfig.type === 'UPLOADED' && modelConfig.quoteId) {
      const prevQuote = quotesMap[modelConfig.quoteId]
      const quote = newQuotes.find(
        q =>
          q.isPrintable &&
          q.quantity === modelConfig.quantity &&
          q.materialConfigId === prevQuote.materialConfigId &&
          q.modelId === prevQuote.modelId &&
          q.vendorId === prevQuote.vendorId
      )

      if (quote) {
        return {
          ...modelConfig,
          quoteId: quote.quoteId
        }
      }
    }

    return modelConfig
  })
