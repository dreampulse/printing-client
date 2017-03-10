import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  isOpen: false,
  contentFactory: null,
  contentProps: {}
}

function handleClose () {
  return initialState
}

function handleOpen (state, action) {
  return {
    isOpen: true,
    contentFactory: action.payload.contentFactory,
    contentProps: action.payload.contentProps || {}
  }
}

export default handleActions({
  [TYPE.MODAL.OPEN]: handleOpen,
  [TYPE.MODAL.CLOSE]: handleClose
}, initialState)
