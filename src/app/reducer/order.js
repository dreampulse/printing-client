import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  orderId: null
}

function handleOrderOrdered (state, {payload: {orderId}}) {
  return {
    ...state,
    orderId
  }
}

export default handleActions({
  [TYPE.ORDER.ORDERED]: handleOrderOrdered
}, initialState)
