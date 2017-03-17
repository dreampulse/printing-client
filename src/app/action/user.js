import {createAction} from 'redux-actions'
import {
  getLocationByIp,
  isAddressValid
} from 'Lib/geolocation'
import * as printingEngine from 'Lib/printing-engine'

import TYPE from '../type'
import {goToCart} from './navigation'
import {createShoppingCart} from './cart'
import {openAddressModal} from './modal'
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

export const reviewOrder = form => async (dispatch) => {
  await dispatch(updateUser(form))
  await dispatch(createShoppingCart())  // TODO: create shopping cart later
  return dispatch(goToCart())
}
