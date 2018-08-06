// @flow
import invariant from 'invariant'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'

import type {AppState, ModelConfig, UploadingFile, ConfigId, BackendModel} from '../../type-next'

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

export const selectUniqueChosenShippings = (state: AppState) => {
  const shippingIds = compact(
    uniq(
      state.core.modelConfigs.map(
        modelConfig => (modelConfig.type === 'UPLOADED' ? modelConfig.shippingId : null)
      )
    )
  )

  return shippingIds.map(id => state.core.shippings.find(shipping => shipping.shippingId === id))
}
