// @flow
import groupBy from 'lodash/groupBy'
import compact from 'lodash/compact'

import type {
  Material,
  ModelConfigUploaded,
  Quote,
  MaterialConfigId,
  MultiModelQuote
} from '../type-next'

export function getBestMultiModelQuote(quotes: Array<MultiModelQuote>): ?MultiModelQuote {
  return quotes.reduce((bestQuote, quote) => {
    const bestPrice = (bestQuote && bestQuote.price) || Number.MAX_SAFE_INTEGER
    if (quote.isPrintable && bestPrice > quote.price) {
      return quote
    }
    return bestQuote
  }, null)
}

export function getBestMultiModelQuoteForMaterialConfig(
  quotes: Array<MultiModelQuote>,
  materialConfigId: MaterialConfigId
): ?MultiModelQuote {
  return getBestMultiModelQuote(quotes.filter(quote => quote.materialConfigId === materialConfigId))
}

export function getBestMultiModelQuoteForMaterial(
  quotes: Array<MultiModelQuote>,
  material: Material
): ?MultiModelQuote {
  const materialConfigs = {}
  material.finishGroups.forEach(finishGroup => {
    finishGroup.materialConfigs.forEach(materialConfig => {
      materialConfigs[materialConfig.id] = true
    })
  })

  return getBestMultiModelQuote(quotes.filter(quote => materialConfigs[quote.materialConfigId]))
}

export function getMultiModelQuotes(
  modelConfigs: Array<ModelConfigUploaded>,
  quotes: Array<Quote>
): Array<MultiModelQuote> {
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
      isPrintable: quotesPerModelConfig.reduce(
        (result, quote) => result && !!quote && quote.isPrintable,
        true
      ),
      price: compact(quotesPerModelConfig).reduce((sum, quote) => sum + quote.price, 0)
    }
  })
}
