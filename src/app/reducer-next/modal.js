// @flow

import type {AppAction, ModalState} from 'App/type-next'

const initialState: ModalState = {
  isOpen: false,
  isCloseable: true,
  content: null,
  contentArgs: null
}

const openModal = (state, action) => ({
  isOpen: true,
  isCloseable: action.payload.isCloseable,
  content: action.payload.content,
  contentArgs: action.payload.contentArgs
})

const closeModal = (state, action) => initialState

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
