// @flow

import type {AppAction, ModalConfig} from '../type'

export type ModalState = {
  isOpen: boolean,
  modalConfig: ModalConfig
}

const initialState: ModalState = {
  isOpen: false,
  modalConfig: null
}

const openModal = (state, action) => ({
  isOpen: true,
  modalConfig: action.payload
})

const closeModal = (_state, _action) => initialState

const reset = () => ({
  ...initialState
})

const reducer = (state: ModalState = initialState, action: AppAction): ModalState => {
  switch (action.type) {
    case 'MODAL.OPEN':
      return openModal(state, action)
    case 'MODAL.CLOSE':
      return closeModal(state, action)
    case 'CORE.RESET':
      return reset()
    default:
      return state
  }
}

export default reducer
