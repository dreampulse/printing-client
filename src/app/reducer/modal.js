import {handleActions} from 'redux-actions'

import TYPE from '../type'

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
      ? action.payload.isCloseable : true,  // Default: isCloseable = true
    contentType: action.payload.contentType,
    contentProps: action.payload.contentProps || {}
  }
}

export default handleActions({
  [TYPE.MODAL.OPEN]: handleOpen,
  [TYPE.MODAL.CLOSE]: handleClose
}, initialState)
