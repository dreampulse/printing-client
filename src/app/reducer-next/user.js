// @flow
import {loop, Cmd} from 'redux-loop'
import type {UserState} from '../type-next'
import type {Actions} from '../action-next'

import {USER} from '../action-type-next'

const initialState = {
  userId: null,
  shippingAddress: null,
  currency: 'USD'
}

const updateAddress = (state, action) => ({
  ...state,
  shippingAddress: action.payload
})

export const reducer = (state: UserState = initialState, action: Actions) => {
  switch (action.type) {
    case USER.UPDATE_ADDRESS:
      return updateAddress(state, action)
    default:
      return state
  }
}

export default reducer
