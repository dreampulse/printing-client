// @flow

import config from '../../../config'
import type {ModelId, Model} from '../type-next'
import * as http from './http'

const baseUrl = config.printingEngineBaseUrl

export const getModelWithStatus = async (
  modelId: ModelId
): Promise<{
  model: Model,
  isComplete: boolean
}> => {
  const {json, response} = await http.fetchJson(`${baseUrl}/model/${modelId}`)

  return {
    model: json,
    isComplete: response.status === 200
  }
}
