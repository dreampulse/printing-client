// @flow

import type {Action, ModelId, ModelSceneId} from '../type-next'

type OpenAction = Action<'MODEL_VIEWER.OPEN', {modelId: ModelId}>
type HandleSceneIdAction = Action<'MODEL_VIEWER.HANDLE_SCENE_ID', {sceneId: ModelSceneId}>
type CloseAction = Action<'MODEL_VIEWER.CLOSE', void>
export type ModelViewerAction = OpenAction | HandleSceneIdAction | CloseAction

export const open = (modelId: ModelId): OpenAction => ({
  type: 'MODEL_VIEWER.OPEN',
  payload: {
    modelId
  }
})

export const handleSceneId = (sceneId: ModelSceneId): HandleSceneIdAction => ({
  type: 'MODEL_VIEWER.HANDLE_SCENE_ID',
  payload: {
    sceneId
  }
})

export const close = (): CloseAction => ({
  type: 'MODEL_VIEWER.CLOSE',
  payload: undefined
})
