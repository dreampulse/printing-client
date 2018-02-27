// @flow

import type {Action, ModalConfigOpened, ModelId} from '../type-next'

type OpenModalAction = Action<'MODAL.OPEN', ModalConfigOpened>
type CloseModalAction = Action<'MODAL.CLOSE', void>
export type ModalAction = OpenModalAction | CloseModalAction

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocation = (): OpenModalAction =>
  open({
    isCloseable: false,
    contentId: 'PICK_LOCATION',
    contentProps: null
  })

export const openModelViewer = (modelId: ModelId): OpenModalAction =>
  open({
    isCloseable: true,
    contentId: 'MODEL_VIEWER',
    contentProps: {
      modelId
    }
  })

export const openFatalError = (error: Error): OpenModalAction =>
  open({
    isCloseable: false,
    contentId: 'FATAL_ERROR',
    contentProps: {
      error
    }
  })

export const close = (): CloseModalAction => ({
  type: 'MODAL.CLOSE',
  payload: undefined
})
