// @flow

import type {State, ModalConfig} from 'App/type-next'

export const isModalOpen = (state: State): boolean => state.modal.isOpen

export const selectModalConfig = (state: State): ModalConfig => ({
  isCloseable: state.modal.isCloseable,
  content: state.modal.content,
  contentArgs: state.modal.contentArgs
})
