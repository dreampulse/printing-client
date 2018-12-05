import {ModelConfig} from '../type'

export const getCommonQuantity = (selectedModelConfigs: ModelConfig[]) => {
  const result = selectedModelConfigs.reduce<number | null>((quantity, modelConfig) => {
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
