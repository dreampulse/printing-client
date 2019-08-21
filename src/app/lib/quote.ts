import groupBy from 'lodash/groupBy'
import compact from 'lodash/compact'

import {ModelConfigUploaded, Quote, MultiModelQuote} from '../type'

export function getMultiModelQuotes(
  modelConfigs: ModelConfigUploaded[],
  quotes: Quote[]
): MultiModelQuote[] {
  // Filter out quotes which are not relevant for given modelConfigs
  const filteredQuotes = quotes.filter(quote =>
    modelConfigs.find(
      modelConfig =>
        modelConfig.modelId === quote.modelId && modelConfig.quantity === quote.quantity
    )
  )
  // Group quotes by materialConfigId and vendorId
  const aggregatedQuotes = Object.values(
    groupBy(filteredQuotes, quote => `${quote.materialConfigId}-${quote.vendorId}`)
  )

  return aggregatedQuotes.map(currentQuotes => {
    // Prices have to be computed per given modelConfigs because the same modelId could be given twice
    const quotesPerModelConfig = modelConfigs.map(modelConfig =>
      currentQuotes.find(
        quote => quote.modelId === modelConfig.modelId && quote.quantity === modelConfig.quantity
      )
    )

    return {
      quotes: currentQuotes,
      vendorId: currentQuotes[0].vendorId,
      materialConfigId: currentQuotes[0].materialConfigId,
      currency: currentQuotes[0].currency,
      isPrintable: quotesPerModelConfig.reduce<boolean>(
        (result, quote) => result && !!quote && quote.isPrintable,
        true
      ),
      price: compact(quotesPerModelConfig).reduce((sum, quote) => sum + quote.price, 0),
      grossPrice: compact(quotesPerModelConfig).reduce((sum, quote) => sum + quote.grossPrice, 0)
    }
  })
}
