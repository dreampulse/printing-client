// @flow

import type {Action, OpenModalConfig} from 'App/type-next'

type OpenModalAction = Action<'MODAL.OPEN_MODAL', OpenModalConfig>
type CloseModalAction = Action<'MODAL.CLOSE_MODAL', void>
export type ModalAction = OpenModalAction | CloseModalAction

export const openModal = (config: OpenModalConfig): OpenModalAction => ({
  type: 'MODAL.OPEN_MODAL',
  payload: config
})

export const openFatalErrorModal = (error: Error): OpenModalAction =>
  openModal({
    isCloseable: false,
    content: 'FATAL_ERROR',
    contentArgs: {
      error
    }
  })

export const openPickLocationModal = (): OpenModalAction =>
  openModal({
    isCloseable: false,
    content: 'PICK_LOCATION',
    contentArgs: null
  })

export const closeModal = (): CloseModalAction => ({
  type: 'MODAL.CLOSE_MODAL',
  payload: undefined
})
