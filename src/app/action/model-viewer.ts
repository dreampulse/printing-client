import {Action, BackendModel, ModelSceneId} from '../type'

export type OpenAction = Action<'MODEL_VIEWER.OPEN', {model: BackendModel}>
export type HandleSceneIdAction = Action<'MODEL_VIEWER.HANDLE_SCENE_ID', {sceneId: ModelSceneId}>
export type CloseAction = Action<'MODEL_VIEWER.CLOSE', void>
export type ModelViewerAction = OpenAction | HandleSceneIdAction | CloseAction

export const open = (model: BackendModel): OpenAction => ({
  type: 'MODEL_VIEWER.OPEN',
  payload: {
    model
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
