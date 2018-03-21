// @flow

import type {ModelId} from '../type-next'
import * as printingEngine from './printing-engine'

export const POLLING_FAILED = Symbol('POLLING_FAILED')

export const pollingFunction = {
  getModelSceneId: async (modelId: ModelId) => {
    const {model} = await printingEngine.getModelWithStatus(modelId)

    return typeof model.sceneId === 'string' ? model.sceneId : POLLING_FAILED
  }
}
