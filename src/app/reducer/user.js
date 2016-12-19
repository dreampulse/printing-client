import { handleActions } from 'redux-actions'

import TYPE from '../type'

const initialState = {
  userId: null
}

function handleUserCreated (state, { payload }) {
  return {
    ...state,
    userId: payload
  }
}

export default handleActions({
  [TYPE.USER.CREATED]: handleUserCreated
}, initialState)
