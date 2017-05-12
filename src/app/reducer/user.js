import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  userId: null,
  user: {
    emailAddress: '',
    phoneNumber: '',
    currency: 'USD',
    isCompany: false,
    // companyName: '',
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
    // useDifferentBillingAddress: false,
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

export default handleActions({
  [TYPE.USER.SHIPPING_ADDRESS_CHANGED]: handleShippingAddressChange,
  [TYPE.USER.CREATED]: handleUserCreated,
  [TYPE.USER.UPDATED]: handleUserUpdated
}, initialState)
