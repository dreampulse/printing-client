import invariant from 'invariant'
import compact from 'lodash/compact'
import unzip from 'lodash/unzip'
import sum from 'lodash/sum'
import uniq from 'lodash/uniq'
import isEqual from 'lodash/isEqual'

import {
  ModelConfig,
  UploadingFile,
  ConfigId,
  BackendModel,
  MaterialConfigId,
  FinishGroupId,
  MaterialId,
  MaterialGroupId,
  MaterialConfig
} from '../type'
import {AppState} from '../reducer'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.core.modelConfigs.map(modelConfig =>
    modelConfig.type === 'UPLOADED'
      ? state.core.backendModels[modelConfig.modelId]
      : state.core.uploadingFiles[modelConfig.fileId]
  )

export const selectShippingsOfModelConfigs = (state: AppState) =>
  state.core.modelConfigs.map(modelConfig =>
    modelConfig.type === 'UPLOADED' && modelConfig.shippingId
      ? state.core.shippings.find(
          shipping =>
            modelConfig.type === 'UPLOADED' && shipping.shippingId === modelConfig.shippingId
        )
      : null
  )

export const selectQuotesOfModelConfigs = (state: AppState) =>
  state.core.modelConfigs.map(modelConfig =>
    modelConfig.type === 'UPLOADED' && modelConfig.quoteId
      ? state.core.quotes[modelConfig.quoteId]
      : null
  )

export const selectUnconfiguredModelConfigIds = (state: AppState) =>
  state.core.modelConfigs
    .filter(modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId === null)
    .map(modelConfig => modelConfig.id)

export const selectCartCount = (state: AppState) =>
  state.core.modelConfigs.filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  ).length

export const selectUploadedModelConfigs = (state: AppState) =>
  state.core.modelConfigs.filter(modelConfig => modelConfig.type === 'UPLOADED')

export const selectSelectedModelConfigs = (state: AppState): ModelConfig[] =>
  state.core.selectedModelConfigs.map(id => {
    const item = state.core.modelConfigs.find(modelConfig => modelConfig.id === id) as ModelConfig
    invariant(item, `ModelConfig for selectedModelConfig ${id} not found!`)
    return item
  })

export const selectModelConfigsByIds = (state: AppState, configIds: ConfigId[]) =>
  state.core.modelConfigs.filter(modelConfig => configIds.includes(modelConfig.id))

export const selectCartShippings = (state: AppState) => {
  const cart = state.core.cart
  if (!cart) {
    return []
  }

  return cart.shippingIds.map(id =>
    state.core.shippings.find(shipping => shipping.shippingId === id)
  )
}

export const selectCommonMaterialPathOfModelConfigs = (
  state: AppState,
  configIds: ConfigId[]
): {
  materialConfigId: MaterialConfigId | null
  finishGroupId: FinishGroupId | null
  materialId: MaterialId | null
  materialGroupId: MaterialGroupId | null
} => {
  const modelConfigs = selectModelConfigsByIds(state, configIds)
  const materialConfigs = compact(
    modelConfigs.map(modelConfig => {
      if (modelConfig.type === 'UPLOADED' && modelConfig.quoteId) {
        return state.core.materialConfigs[state.core.quotes[modelConfig.quoteId].materialConfigId]
      }

      return null
    })
  )

  const findCommonProperty = (
    arr: MaterialConfig[],
    getProperty: (materialConfig: MaterialConfig) => string
  ): any => {
    const commonProperty = arr.length > 0 ? getProperty(arr[0]) : null
    return arr.every(item => getProperty(item) === commonProperty) ? commonProperty : null
  }

  return {
    materialConfigId: findCommonProperty(materialConfigs, materialConfig => materialConfig.id),
    finishGroupId: findCommonProperty(
      materialConfigs,
      materialConfig => materialConfig.finishGroupId
    ),
    materialId: findCommonProperty(materialConfigs, materialConfig => materialConfig.materialId),
    materialGroupId: findCommonProperty(
      materialConfigs,
      materialConfig => materialConfig.materialGroupId
    )
  }
}

export const selectConfiguredModelInformation = (state: AppState) =>
  unzip<any>([
    state.core.modelConfigs,
    selectModelsOfModelConfigs(state),
    selectShippingsOfModelConfigs(state),
    selectQuotesOfModelConfigs(state)
  ])
    .filter(([modelConfig]) => {
      const mc: ModelConfig = modelConfig
      return mc.type === 'UPLOADED' && mc.quoteId !== null
    })
    .map(([modelConfig, model, shipping, quote]: any) => {
      const materialConfig = state.core.materialConfigs[quote.materialConfigId]
      const finishGroup = state.core.finishGroups[materialConfig.finishGroupId]

      const finishGroupName = finishGroup.name
      const materialName = finishGroup.materialName
      const providerInfo = finishGroup.properties.printingServiceName[quote.vendorId]
      const {id: materialConfigId, colorCode, color, colorImage} = materialConfig
      const productionTimeFast = materialConfig.printingService[quote.vendorId].productionTimeFast
      const productionTimeSlow = materialConfig.printingService[quote.vendorId].productionTimeSlow

      return {
        modelConfig,
        model,
        shipping,
        quote,
        finishGroupName,
        materialName,
        providerInfo,
        materialConfigId,
        colorCode,
        color,
        colorImage,
        productionTimeFast,
        productionTimeSlow
      }
    })

export const selectQuotePollingProgress = (state: AppState) => ({
  complete: sum(Object.values(state.core.printingServiceComplete)),
  total: Object.keys(state.core.printingServiceComplete).length
})

export const selectQuotes = (state: AppState) => Object.values(state.core.quotes)

export const selectUsedShippingIdsAndFilter = (
  state: AppState,
  excludeConfigIds: ConfigId[] = []
) =>
  uniq(
    compact(
      state.core.modelConfigs.map(modelConfig =>
        modelConfig.type === 'UPLOADED' &&
        !excludeConfigIds.find(id => modelConfig.type === 'UPLOADED' && id === modelConfig.id)
          ? modelConfig.shippingId
          : null
      )
    )
  )

export const hasOnlyValidModelConfigsWithQuote = (state: AppState) =>
  unzip<any>([state.core.modelConfigs, selectQuotesOfModelConfigs(state)])
    .filter(([modelConfig, quote]) => modelConfig.type === 'UPLOADED' && quote)
    .every(([modelConfig, quote]) => modelConfig.quantity === quote.quantity)

export const isCartUpToDate = (state: AppState) => {
  const quoteIds = compact(
    state.core.modelConfigs.map(
      modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId
    )
  )

  return !!state.core.cart && isEqual(state.core.cart.quoteIds, quoteIds)
}

export const isAppReady = (state: AppState) =>
  !!(
    state.core &&
    state.core.materialGroups &&
    state.core.materials &&
    state.core.finishGroups &&
    state.core.materialConfigs &&
    state.core.location &&
    state.core.currency
  )
