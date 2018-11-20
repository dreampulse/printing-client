import keyBy from 'lodash/keyBy'

import {ModelConfig, Quote, Shipping, ConfigId} from '../type'

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
