import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  orderId: null
}

function handleOrderSuccess (state, {payload}) {
  return {
    ...state,
    orderId: payload
  }
}

export default handleActions({
  [TYPE.ORDER.SUCCESS]: handleOrderSuccess,
}, initialState)
