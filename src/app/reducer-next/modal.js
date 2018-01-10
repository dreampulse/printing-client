// @flow

import type {AppAction, ModalConfig} from '../type-next'

export type ModalState = ModalConfig & {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
  isCloseable: true,
  content: null,
  contentProps: null
}

const openModal = (state, action) => ({
  isOpen: true,
  isCloseable: action.payload.isCloseable,
  content: action.payload.content,
  contentProps: action.payload.contentProps
})

const closeModal = (_state, _action) => initialState

const reducer = (state: ModalState = initialState, action: AppAction): ModalState => {
  switch (action.type) {
    case 'MODAL.OPEN_MODAL':
      return openModal(state, action)
    case 'MODAL.CLOSE_MODAL':
      return closeModal(state, action)
    default:
      return state
  }
}

export default reducer
