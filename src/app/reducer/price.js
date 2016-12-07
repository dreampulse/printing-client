import {handleActions} from 'redux-actions'

import TYPE from '../type'

export default function create () {
  const initialState = {
    priceId: null
  }

  function handlePriceRequestCreated(state, {payload}) {
    return {
      ...state,
      priceId: payload
    }
  }

  return handleActions({
    [TYPE.PRICE.REQUEST_CREATED]: handlePriceRequestCreated
  }, initialState)
}
