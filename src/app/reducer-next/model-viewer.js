// @flow

import {loop, Cmd} from 'redux-loop'

import type {AppAction, ModelId, PollingId, ModelSceneId} from '../type-next'
import * as modelViewerAction from '../action-next/model-viewer'
import * as pollingAction from '../action-next/polling'
import * as modalAction from '../action-next/modal'
import * as coreAction from '../action-next/core'
import * as printingEngine from '../lib/printing-engine'

export type ModelViewerState = {
  modelId: ?ModelId,
  pollingId: ?PollingId,
  sceneId: ?ModelSceneId
}

const initialState: ModelViewerState = {
  modelId: null,
  pollingId: null,
  sceneId: null
}

const open = (state, action) => {
  const {model} = action.payload
  const startPollingAction = pollingAction.start({
    pollingFunction: async (modelId: ModelId) => {
      const modelNext = await printingEngine.getModel(modelId)

      return typeof modelNext.sceneId === 'string'
        ? {status: 'POLLING_DONE', result: modelNext.sceneId}
        : {status: 'POLLING_CONTINUE', result: null}
    },
    pollingArgs: [model.modelId],
    onSuccessActionCreator: modelViewerAction.handleSceneId,
    onFailActionCreator: coreAction.fatalError
  })

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
  const pollingId = state.pollingId
  if (pollingId) {
    const closeModalAction = modalAction.close()
    const cancelPollingAction = pollingAction.cancel(pollingId)

    return loop(
      initialState,
      Cmd.list([Cmd.action(closeModalAction), Cmd.action(cancelPollingAction)])
    )
  }
  return state
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
