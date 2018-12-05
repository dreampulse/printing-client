import {Actions} from '../action'
import {ModalConfig} from '../type'
import * as modalActions from '../action/modal'

export type ModalState = {
  isOpen: boolean
  modalConfig: ModalConfig
}

const initialState: ModalState = {
  isOpen: false,
  modalConfig: null
}

const openModal = (state: ModalState, action: modalActions.OpenModalAction): ModalState => ({
  isOpen: true,
  modalConfig: action.payload
})

const closeModal = (): ModalState => initialState

const reset = (): ModalState => ({
  ...initialState
})

const reducer = (state: ModalState = initialState, action: Actions): ModalState => {
  switch (action.type) {
    case 'MODAL.OPEN':
      return openModal(state, action)
    case 'MODAL.CLOSE':
      return closeModal()
    case 'CORE.RESET':
      return reset()
    default:
      return state
  }
}

export default reducer
