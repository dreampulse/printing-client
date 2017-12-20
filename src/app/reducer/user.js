// @flow

import type {UserState} from '../type'
import TYPE, {type Action} from '../action-type'

const initialState = {
  userId: null,
  currency: 'USD',
  user: {
    emailAddress: '',
    phoneNumber: '',
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

function handleShippingAddressChange(state, {payload: {address}}) {
  return {
    ...state,
    user: {
      ...state.user,
      shippingAddress: address
    }
  }
}

function handleUserCreated(state, {payload: {userId}}) {
  return {
    ...state,
    userId
  }
}

function handleUserUpdated(state, {payload}) {
  return {
    ...state,
    user: payload
  }
}

function handleCurrencyChanged(state, {payload: currency}) {
  return {
    ...state,
    currency,
    user: {
      ...state.user
    }
  }
}

const reducer = (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case TYPE.USER.SHIPPING_ADDRESS_CHANGED:
      return handleShippingAddressChange(state, action)
    case TYPE.USER.CREATED:
      return handleUserCreated(state, action)
    case TYPE.USER.UPDATED:
      return handleUserUpdated(state, action)
    case TYPE.USER.CURRENCY_CHANGED:
      return handleCurrencyChanged(state, action)
    default:
      return state
  }
}

export default reducer
