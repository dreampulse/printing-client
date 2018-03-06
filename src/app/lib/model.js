// @flow

import config from '../../../config'
import type {ModelId, ModelSceneId, Model} from '../type-next'
import * as http from './http'
import {PollingFunctionFailSignal} from './error'

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

export const pollModelForSceneId = async (modelId: ModelId): Promise<ModelSceneId> => {
  const result = await getModelWithStatus(modelId)
  const model = result.model

  if (typeof model.sceneId !== 'string') {
    throw new PollingFunctionFailSignal('Model scene id')
  }

  return model.sceneId
}
