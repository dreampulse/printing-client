// @flow

import type {Action, UserState} from '../type'

const initialState : UserState = {
  userId: null,
  user: {
    emailAddress: '',
    phoneNumber: '',
    currency: 'USD',
    isCompany: false,
    companyName: undefined,
    vatId: '',
    shippingAddress: {
      firstName: '',
      lastName: '',
      street: '',
      houseNumber: '',
      addressLine2: '',
      city: '',
      zipCode: '',
      stateCode: '',
      countryCode: ''
    },
    useDifferentBillingAddress: undefined,
    billingAddress: {
      firstName: '',
      lastName: '',
      street: '',
      houseNumber: '',
      addressLine2: '',
      city: '',
      zipCode: '',
      stateCode: '',
      countryCode: ''
    }
  }
}

function handleShippingAddressChange (state, {payload: {address}}) {
  return {
    ...state,
    user: {
      ...state.user,
      shippingAddress: address
    }
  }
}

function handleUserCreated (state, {payload: {userId}}) {
  return {
    ...state,
    userId
  }
}

function handleUserUpdated (state, {payload}) {
  return {
    ...state,
    user: payload
  }
}

const reducer = (state : UserState = initialState, action: Action) : UserState => {
  switch (action.type) {
    case 'USER.SHIPPING_ADDRESS_CHANGED': return handleShippingAddressChange(state, action)
    case 'USER.CREATED': return handleUserCreated(state, action)
    case 'USER.UPDATED': return handleUserUpdated(state, action)
    default: return state
  }
}

export default reducer
