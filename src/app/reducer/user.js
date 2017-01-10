import { handleActions } from 'redux-actions'

import TYPE from '../type'

const initialState = {
  userId: null,
  user: {
    currency: 'USD',
    shippingAddress: null
  }
}

function handleShippingAddressChange (state, { payload }) {
  return {
    ...state,
    user: {
      ...state.user,
      shippingAddress: payload
    }
  }
}

function handleUserCreated (state, { payload }) {
  return {
    ...state,
    userId: payload
  }
}

export default handleActions({
  [TYPE.USER.SHIPPING_ADDRESS_CHANGED]: handleShippingAddressChange,
  [TYPE.USER.CREATED]: handleUserCreated
}, initialState)
