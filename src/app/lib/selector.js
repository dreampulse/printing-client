// @flow
import invariant from 'invariant'
import compact from 'lodash/compact'
import unzip from 'lodash/unzip'
import sum from 'lodash/sum'
import uniq from 'lodash/uniq'

import type {
  AppState,
  ModelConfig,
  UploadingFile,
  ConfigId,
  BackendModel,
  MaterialConfigId,
  FinishGroupId,
  MaterialId,
  MaterialGroupId
} from '../type'
import {getMaterialConfigById, getMaterialTreeByMaterialConfigId} from './material'

export const selectModelsOfModelConfigs = (state: AppState): Array<UploadingFile | BackendModel> =>
  state.core.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED'
        ? state.core.backendModels[modelConfig.modelId]
        : state.core.uploadingFiles[modelConfig.fileId]
  )

export const selectShippingsOfModelConfigs = (state: AppState) =>
  state.core.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED' && modelConfig.shippingId
        ? state.core.shippings.find(
            shipping =>
              modelConfig.type === 'UPLOADED' && shipping.shippingId === modelConfig.shippingId
          )
        : null
  )

export const selectQuotesOfModelConfigs = (state: AppState) =>
  state.core.modelConfigs.map(
    modelConfig =>
      modelConfig.type === 'UPLOADED' && modelConfig.quoteId
        ? state.core.quotes[modelConfig.quoteId]
        : null
  )

export const selectCartCount = (state: AppState) =>
  state.core.modelConfigs.filter(
    modelConfig => modelConfig.type === 'UPLOADED' && modelConfig.quoteId !== null
  ).length

export const selectUploadedModelConfigs = (state: AppState) =>
  state.core.modelConfigs.filter(modelConfig => modelConfig.type === 'UPLOADED')

export const selectSelectedModelConfigs = (state: AppState): Array<ModelConfig> =>
  state.core.selectedModelConfigs.map(id => {
    const item = state.core.modelConfigs.find(modelConfig => modelConfig.id === id)
    invariant(item, `ModelConfig for selectedModelConfig ${id} not found!`)
    return item
  })

export const selectModelConfigsByIds = (state: AppState, configIds: Array<ConfigId>) =>
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
  configIds: Array<ConfigId>
): {
  materialConfigId: ?MaterialConfigId,
  finishGroupId: ?FinishGroupId,
  materialId: ?MaterialId,
  materialGroupId: ?MaterialGroupId
} => {
  const modelConfigs = selectModelConfigsByIds(state, configIds)
  const materialConfigs = compact(
    modelConfigs.map(modelConfig => {
      if (modelConfig.type === 'UPLOADED' && modelConfig.quoteId) {
        return getMaterialConfigById(
          state.core.materialGroups,
          state.core.quotes[modelConfig.quoteId].materialConfigId
        )
      }

      return null
    })
  )

  const findCommonProperty = (arr, getProperty) => {
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
  unzip([
    state.core.modelConfigs,
    selectModelsOfModelConfigs(state),
    selectShippingsOfModelConfigs(state),
    selectQuotesOfModelConfigs(state)
  ])
    .filter(([modelConfig]) => {
      const mc = (modelConfig: any) // Flow bug with detecting correct branch in union type
      return mc.type === 'UPLOADED' && mc.quoteId !== null
    })
    .map(([modelConfig, model, shipping, quote]: any) => {
      const materialTree = getMaterialTreeByMaterialConfigId(
        state.core.materialGroups,
        quote.materialConfigId
      )
      const process = materialTree.finishGroup.properties.printingMethodShort
      const providerInfo = materialTree.finishGroup.properties.printingServiceName[quote.vendorId]
      const {id: materialConfigId, colorCode, color, colorImage} = materialTree.materialConfig

      return {
        modelConfig,
        model,
        shipping,
        quote,
        process,
        providerInfo,
        materialConfigId,
        colorCode,
        color,
        colorImage
      }
    })

export const isQuotePollingDone = (state: AppState) => !state.core.quotePollingId

export const selectQuotePollingProgress = (state: AppState) => ({
  complete: sum(Object.values(state.core.printingServiceComplete)),
  total: Object.keys(state.core.printingServiceComplete).length
})

export const selectQuotes = (state: AppState) => Object.values(state.core.quotes)

export const selectUsedShippingIdsAndFilter = (
  state: AppState,
  excludeConfigIds: Array<ConfigId> = []
) =>
  uniq(
    compact(
      state.core.modelConfigs.map(
        modelConfig =>
          modelConfig.type === 'UPLOADED' &&
          !excludeConfigIds.find(id => modelConfig.type === 'UPLOADED' && id === modelConfig.id)
            ? modelConfig.shippingId
            : null
      )
    )
  )
