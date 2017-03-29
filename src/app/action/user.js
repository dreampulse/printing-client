import {createAction} from 'redux-actions'

import {
  formValueSelector,
  change
} from 'redux-form'

import isEqual from 'lodash/isEqual'
import {
  getLocationByIp,
  isAddressValid
} from 'Lib/geolocation'
import * as printingEngine from 'Lib/printing-engine'

import {delay} from 'Lib/timeout'  // TODO: just for testing

import TYPE from '../type'
import {goToCart} from './navigation'
import {createShoppingCart} from './cart'
import {
  openAddressModal,
  openPriceChangedModal,
  openFetchingPriceModal
} from './modal'
import {createPriceRequest} from './price'

export const detectAddress = () =>
  createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(getLocationByIp())

export const createUser = () => (dispatch, getState) => {
  const user = getState().user.user
  const userPromise = printingEngine.createUser({user})
  return dispatch(createAction(TYPE.USER.CREATED)(userPromise))
}

export const updateUser = user => (dispatch, getState) => {
  const userId = getState().user.userId
  const updatedPromise = printingEngine.updateUser({userId, user})
  return dispatch(createAction(TYPE.USER.UPDATED)(updatedPromise))
}

export const updateLocation = location => (dispatch) => {
  dispatch(createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(location))

  if (!isAddressValid(location)) {
    // Open address modal if location is not valid
    dispatch(openAddressModal())
  } else {
    // Update prices
    dispatch(createPriceRequest())
  }
}

export const reviewOrder = form => async (dispatch, getState) => {
  const oldShippingAddress = getState().user.user.shippingAddress
  const newShippingAddress = form.shippingAddress

  await dispatch(updateUser(form))

  if (!isEqual(oldShippingAddress, newShippingAddress)) {
    dispatch(openFetchingPriceModal())
    await dispatch(createPriceRequest())
    await delay(1000)  // Just for testing
    await dispatch(createShoppingCart())  // TODO: create shopping cart later
    const hasPriceChanged = true  // TODO: check if prices has changed
    if (hasPriceChanged) {
      dispatch(openPriceChangedModal({oldShippingAddress, newShippingAddress}))
    } else {
      dispatch(goToCart())
    }
  } else {
    // No change to the shipping address
    await dispatch(createShoppingCart())  // TODO: create shopping cart later
    dispatch(goToCart())
  }
}

export const copyShippingAddressToBillingAddress = () => (dispatch, getState) => {
  const addressFormName = 'address'
  const state = getState()
  const selector = formValueSelector(addressFormName)
  const useDifferentBillingAddress = selector(state, 'useDifferentBillingAddress')
  if (useDifferentBillingAddress === false) {
    dispatch(change(addressFormName, 'billingAddress.firstName', ''))
    dispatch(change(addressFormName, 'billingAddress.lastName', ''))
    dispatch(change(addressFormName, 'billingAddress.street', ''))
    dispatch(change(addressFormName, 'billingAddress.houseNumber', ''))
    dispatch(change(addressFormName, 'billingAddress.addressLine2', ''))
    dispatch(change(addressFormName, 'billingAddress.city', ''))
    dispatch(change(addressFormName, 'billingAddress.zipCode', ''))
    dispatch(change(addressFormName, 'billingAddress.stateCode', ''))
    dispatch(change(addressFormName, 'billingAddress.countryCode', ''))
  } else {
    dispatch(change(addressFormName, 'billingAddress.firstName', selector(state, 'shippingAddress.firstName')))
    dispatch(change(addressFormName, 'billingAddress.lastName', selector(state, 'shippingAddress.lastName')))
    dispatch(change(addressFormName, 'billingAddress.street', selector(state, 'shippingAddress.street')))
    dispatch(change(addressFormName, 'billingAddress.houseNumber', selector(state, 'shippingAddress.houseNumber')))
    dispatch(change(addressFormName, 'billingAddress.addressLine2', selector(state, 'shippingAddress.addressLine2')))
    dispatch(change(addressFormName, 'billingAddress.city', selector(state, 'shippingAddress.city')))
    dispatch(change(addressFormName, 'billingAddress.zipCode', selector(state, 'shippingAddress.zipCode')))
    dispatch(change(addressFormName, 'billingAddress.stateCode', selector(state, 'shippingAddress.stateCode')))
    dispatch(change(addressFormName, 'billingAddress.countryCode', selector(state, 'shippingAddress.countryCode')))
  }
}
