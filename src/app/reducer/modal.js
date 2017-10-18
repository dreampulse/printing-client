// @flow

import type {ModalState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  isOpen: false,
  isCloseable: true,
  contentType: null,
  contentProps: {}
}

function handleClose () {
  return initialState
}

function handleOpen (state, action) {
  return {
    isOpen: true,
    isCloseable: action.payload.isCloseable !== undefined
      ? action.payload.isCloseable : true, // Default: isCloseable = true
    contentType: action.payload.contentType,
    contentProps: action.payload.contentProps || {}
  }
}

const reducer = (state : ModalState = initialState, action: Action) : ModalState => {
  switch (action.type) {
    case TYPE.MODAL.OPEN: return handleOpen(state, action)
    case TYPE.MODAL.CLOSE: return handleClose()

    default: return state
  }
}

export default reducer
