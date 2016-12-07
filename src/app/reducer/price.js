import {handleActions} from 'redux-actions'

import TYPE from '../type'


const initialState = {
  priceId: null
}

function handlePriceRequestCreated(state, {payload}) {
  return {
    ...state,
    priceId: payload
  }
}

export default handleActions({
  [TYPE.PRICE.REQUEST_CREATED]: handlePriceRequestCreated
}, initialState)
