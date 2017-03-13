import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  isOpen: false,
  contentType: null,
  contentProps: {}
}

function handleClose () {
  return initialState
}

function handleOpen (state, action) {
  return {
    isOpen: true,
    contentType: action.payload.contentType,
    contentProps: action.payload.contentProps || {}
  }
}

export default handleActions({
  [TYPE.MODAL.OPEN]: handleOpen,
  [TYPE.MODAL.CLOSE]: handleClose
}, initialState)
