// @flow
import type {ModelConfig} from '../type-next'

export const getCommonQuantity = (selectedModelConfigs: Array<ModelConfig>): ?number => {
  const result = selectedModelConfigs.reduce((quantity, modelConfig) => {
    if (modelConfig.type !== 'UPLOADED') {
      return quantity
    }
    if (quantity === -1) {
      return modelConfig.quantity
    }
    if (quantity === modelConfig.quantity) {
      return quantity
    }
    return null
  }, -1)

  if (result === -1) {
    return null
  }

  return result
}
