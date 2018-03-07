// @flow

import type {ModelId} from '../type-next'
import * as modelLib from './model'

export const POLLING_FAILED = Symbol('POLLING_FAILED')

export const pollingFunction = {
  modelSceneId: async (modelId: ModelId) => {
    const {model} = await modelLib.getModelWithStatus(modelId)

    return typeof model.sceneId === 'string' ? model.sceneId : POLLING_FAILED
  }
}
