import {createAction} from 'redux-actions'
import isEqual from 'lodash/isEqual'
import {
  getLocationByIp,
  isAddressValid
} from 'Lib/geolocation'
import * as printingEngine from 'Lib/printing-engine'
import {AppError} from 'Lib/error'

import TYPE, {ERROR_TYPE} from '../type'
import {goToCart} from './navigation'

import {
  openAddressModal,
  openPriceChangedModal,
  openFetchingPriceModal
} from './modal'
import {createPriceRequest} from './price'

// Private actions

const shippingAddressChanged = createAction(
  TYPE.USER.SHIPPING_ADDRESS_CHANGED,
  address => ({address})
)

// Public actions

export const detectAddress = () => async (dispatch) => {
  try {
    const address = await getLocationByIp()
    dispatch(shippingAddressChanged(address))
  } catch (error) {
    throw new AppError(ERROR_TYPE.DETECT_ADDRESS_FAILED)
  }
}

export const createUser = () => (dispatch, getState) => {
  const user = getState().user.user
  // TODO handle error
  const userPromise = printingEngine.createUser({user})
  return dispatch(createAction(TYPE.USER.CREATED)(userPromise))
}

export const updateUser = user => async (dispatch, getState) => {
  const userId = getState().user.userId
  // TODO handle error
  await printingEngine.updateUser({userId, user})
  return dispatch(createAction(TYPE.USER.UPDATED)(user))
}

export const updateLocation = location => async (dispatch, getState) => {
  dispatch(createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(location))

  if (!isAddressValid(location)) {
    // Open address modal if location is not valid
    dispatch(openAddressModal())
  } else {
    if (!getState().user.userId) {  // No user created so far
      await dispatch(createUser())
    }

    // Update prices
    dispatch(createPriceRequest())
  }
}

export const reviewOrder = form => async (dispatch, getState) => {
  const oldShippingAddress = getState().user.user.shippingAddress
  const newShippingAddress = form.shippingAddress

  await dispatch(updateUser(form))

  // TODO: remove this check, just always open fetching price modal
  if (!isEqual(oldShippingAddress, newShippingAddress)) {
    dispatch(openFetchingPriceModal())

    const oldPrice = getState().price.selectedOffer.totalPrice
    await dispatch(createPriceRequest())
    const newPrice = getState().price.selectedOffer.totalPrice
    const hasPriceChanged = oldPrice !== newPrice
    if (hasPriceChanged) {
      dispatch(openPriceChangedModal({oldShippingAddress, newShippingAddress}))
    } else {
      dispatch(goToCart())
    }
  } else {
    // No change to the shipping address
    dispatch(goToCart())
  }
}
