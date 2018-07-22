// @flow

import {loop, Cmd} from 'redux-loop'

import config from '../../../config'
import type {AppAction, ModelId, PollingId, ModelSceneId} from '../type-next'
import * as modelViewerAction from '../action-next/model-viewer'
import * as pollingAction from '../action-next/polling'
import * as modalAction from '../action-next/modal'
import * as coreAction from '../action-next/core'
import {pollingFunction} from '../lib/polling'

export type ModelViewerState = null | {
  modelId: ModelId,
  pollingId: PollingId,
  sceneId: null | ModelSceneId
}

const initialState: ModelViewerState = null

const open = (state, action) => {
  const {model} = action.payload
  const startPollingAction = pollingAction.start(
    pollingFunction.getModelSceneId,
    [model.modelId],
    modelViewerAction.handleSceneId,
    coreAction.fatalError,
    config.pollingInterval
  )

  return loop(
    {
      modelId: model.modelId,
      pollingId: startPollingAction.payload.pollingId,
      sceneId: null
    },
    Cmd.list([
      Cmd.action(modalAction.openModelViewer(model.fileName)),
      Cmd.action(startPollingAction)
    ])
  )
}

const handleSceneId = (state, action) => ({
  ...state,
  sceneId: action.payload.sceneId
})

const close = (state, _action) => {
  if (state === null) {
    return state
  }
  const closeModalAction = modalAction.close()
  const cancelPollingAction = pollingAction.cancel(state.pollingId)

  return loop(null, Cmd.list([Cmd.action(closeModalAction), Cmd.action(cancelPollingAction)]))
}

export const reducer = (
  state: ModelViewerState = initialState,
  action: AppAction
): ModelViewerState => {
  switch (action.type) {
    case 'MODEL_VIEWER.OPEN':
      return open(state, action)
    case 'MODEL_VIEWER.HANDLE_SCENE_ID':
      return handleSceneId(state, action)
    case 'MODEL_VIEWER.CLOSE':
      return close(state, action)
    default:
      return state
  }
}

export default reducer
