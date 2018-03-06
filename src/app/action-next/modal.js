// @flow

import type {Action, ModalContentType, ModalConfigOpened, ModelId} from '../type-next'

type OpenModalAction = Action<'MODAL.OPEN', ModalConfigOpened>
type CloseModalAction = Action<'MODAL.CLOSE', void>
export type ModalAction = OpenModalAction | CloseModalAction

export const CONTENT_TYPE: {[ModalContentType]: ModalContentType} = {
  PICK_LOCATION: 'PICK_LOCATION',
  MODEL_VIEWER: 'MODEL_VIEWER',
  FATAL_ERROR: 'FATAL_ERROR'
}

const open = (config: ModalConfigOpened): OpenModalAction => ({
  type: 'MODAL.OPEN',
  payload: config
})

export const openPickLocation = (): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.PICK_LOCATION,
    contentProps: null
  })

export const openModelViewer = (modelId: ModelId): OpenModalAction =>
  open({
    isCloseable: true,
    contentType: CONTENT_TYPE.MODEL_VIEWER,
    contentProps: {
      modelId
    }
  })

export const openFatalError = (error: Error): OpenModalAction =>
  open({
    isCloseable: false,
    contentType: CONTENT_TYPE.FATAL_ERROR,
    contentProps: {
      error
    }
  })

export const close = (): CloseModalAction => ({
  type: 'MODAL.CLOSE',
  payload: undefined
})
