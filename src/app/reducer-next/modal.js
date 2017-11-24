// @flow

import type {ModalState} from '../type-next'
import * as modal from '../action-next/modal'

// eslint-disable-next-line no-unused-vars
type _ExtractReturn<B, F: (...args: any[]) => B> = B
type ExtractReturn<F> = _ExtractReturn<*, F>

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

export type ModalAction =
  | ExtractReturn<typeof modal.close>
  | ExtractReturn<typeof modal.openAddress>
  | ExtractReturn<typeof modal.openFatalError>

const reducer = (state: ModalState = initialState, action: ModalAction): ModalState => {
  switch (action.type) {
    case modal.TYPE.CLOSE:
      return close()
    case modal.TYPE.OPEN_ADDRESS:
      return openAddress(state, action)
    case modal.TYPE.OPEN_FATAL_ERROR:
      return openFatalError(state, action)
    default:
      return state
  }
}

export default reducer
