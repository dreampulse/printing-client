import {handleActions} from 'redux-actions'

import TYPE from '../type'

const initialState = {
  userId: null,
  user: {
    emailAddress: '',
    phoneNumber: '',
    currency: 'USD',
    isCompany: false,
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
  },
  addressDetectionFailed: null
}

function handleShippingAddressChange (state, {payload}) {
  return {
    ...state,
    user: {
      ...state.user,
      shippingAddress: payload
    }
  }
}

function handleAddressDetectionFailed (state) {
  return {
    ...state,
    addressDetectionFailed: true
  }
}

function handleUserCreated (state, {payload}) {
  return {
    ...state,
    userId: payload
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
  [TYPE.USER.SHIPPING_ADDRESS_DETECTION_FAILED]: handleAddressDetectionFailed,
  [TYPE.USER.CREATED]: handleUserCreated,
  [TYPE.USER.UPDATED]: handleUserUpdated
}, initialState)
