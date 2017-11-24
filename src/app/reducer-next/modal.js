// @flow

import type {ModalState} from '../type-next'
import {MODAL} from '../action-type-next'

const initialState = {
  isOpen: false,
  isCloseable: true,
  content: null
}

const close = () => initialState

const openAddress = () => ({
  isOpen: true,
  isCloseable: false,
  content: /* <AddressModal /> */ null
})

const reducer = (state: ModalState = initialState, action): ModalState => {
  switch (action.type) {
    case MODAL.OPEN_ADDRESS:
      return openAddress()
    case MODAL.CLOSE:
      return close()

    default:
      return state
  }
}

export default reducer
