// @flow

import type {ModalState} from '../type-next'
import {MODAL} from '../action-type-next'

const initialState = {
  isOpen: false,
  isCloseable: true,
  content: null
}

const close = () => initialState

const openAddress = (state, action) => ({
  isOpen: true,
  isCloseable: false,
  content: /* <AddressModal /> */ null
})

const openFatalError = (state, action) => ({
  isOpen: true,
  isCloseable: false,
  content: /* <FatalErrorModal message={action.payload} /> */ null
})

const reducer = (state: ModalState = initialState, action): ModalState => {
  switch (action.type) {
    case MODAL.CLOSE:
      return close()
    case MODAL.OPEN_ADDRESS:
      return openAddress(state, action)
    case MODAL.OPEN_FATAL_ERROR:
      return openFatalError(state, action)
    default:
      return state
  }
}

export default reducer
