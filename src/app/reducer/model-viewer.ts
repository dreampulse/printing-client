import {loop, Cmd, Loop} from 'redux-loop'

import {ModelId, PollingId, ModelSceneId, PollingStatus} from '../type'
import {Actions} from '../action'
import * as modelViewerActions from '../action/model-viewer'
import * as pollingActions from '../action/polling'
import * as modalActions from '../action/modal'
import * as coreActions from '../action/core'
import * as printingEngine from '../lib/printing-engine'

export type ModelViewerState = {
  modelId: ModelId | null
  pollingId: PollingId | null
  sceneId: ModelSceneId | null
}

type ModelViewerReducer = ModelViewerState | Loop<ModelViewerState, Actions>

const initialState: ModelViewerState = {
  modelId: null,
  pollingId: null,
  sceneId: null
}

const open = (
  state: ModelViewerState,
  action: modelViewerActions.OpenAction
): ModelViewerReducer => {
  const {model} = action.payload
  const startPollingAction = pollingActions.start({
    pollingFunction: async (modelId: ModelId) => {
      // TODO: This is a Bug!! We need to deal with multiple models now!
      // The [0] is just a fix for typescript...
      const modelNext = (await printingEngine.getModel(modelId))[0]

      return typeof modelNext.sceneId === 'string'
        ? {status: PollingStatus.POLLING_DONE, result: modelNext.sceneId}
        : {status: PollingStatus.POLLING_CONTINUE, result: null}
    },
    pollingArgs: [model.modelId],
    onSuccessActionCreator: modelViewerActions.handleSceneId,
    onFailActionCreator: coreActions.fatalError
  })

  return loop(
    {
      modelId: model.modelId,
      pollingId: startPollingAction.payload.pollingId,
      sceneId: null
    },
    Cmd.list<Actions>([
      Cmd.action(modalActions.openModelViewerModal(model.fileName)),
      Cmd.action(startPollingAction)
    ])
  )
}

const handleSceneId = (
  state: ModelViewerState,
  action: modelViewerActions.HandleSceneIdAction
): ModelViewerReducer => ({
  ...state,
  sceneId: action.payload.sceneId
})

const close = (state: ModelViewerState): ModelViewerReducer => {
  const pollingId = state.pollingId
  if (pollingId) {
    const closeModalAction = modalActions.closeModal()
    const cancelPollingAction = pollingActions.cancel(pollingId)

    return loop(
      initialState,
      Cmd.list<Actions>([Cmd.action(closeModalAction), Cmd.action(cancelPollingAction)])
    )
  }
  return state
}

const reset = (): ModelViewerReducer => ({
  ...initialState
})

export const reducer = (
  state: ModelViewerState = initialState,
  action: Actions
): ModelViewerReducer => {
  switch (action.type) {
    case 'MODEL_VIEWER.OPEN':
      return open(state, action)
    case 'MODEL_VIEWER.HANDLE_SCENE_ID':
      return handleSceneId(state, action)
    case 'MODEL_VIEWER.CLOSE':
      return close(state)
    case 'CORE.RESET':
      return reset()
    default:
      return state
  }
}

export default reducer
