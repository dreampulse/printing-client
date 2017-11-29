// @flow
import type {State} from 'App/type-next'

export const isModalOpen = (state: State) => state.modal.isOpen

export const selectModalConfig = (state: State) => ({
  isCloseable: state.modal.isCloseable,
  content: state.modal.content
})
