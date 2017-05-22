import {createAction} from 'redux-actions'
import {
  getLocationByIp,
  isAddressValid
} from 'Lib/geolocation'
import * as printingEngine from 'Lib/printing-engine'
import {identify} from 'Service/mixpanel'

import TYPE from '../type'
import {goToCart} from './navigation'

import {
  openAddressModal,
  openPriceChangedModal,
  openPriceLocationChangedModal,
  openFetchingPriceModal
} from './modal'
import {createPriceRequest} from './price'

// Private actions

const shippingAddressChanged = createAction(
  TYPE.USER.SHIPPING_ADDRESS_CHANGED,
  address => ({address})
)
const userCreated = createAction(
  TYPE.USER.CREATED,
  userId => ({userId})
)

// Public actions

export const detectAddress = () => async (dispatch) => {
  try {
    const address = await getLocationByIp()
    dispatch(shippingAddressChanged(address))
  } catch (error) {
    dispatch(openAddressModal())
  }
}

export const createUser = () => async (dispatch, getState) => {
  const user = getState().user.user
  const {userId} = await printingEngine.createUser({user})
  return dispatch(userCreated(userId))
}

export const updateUser = user => async (dispatch, getState) => {
  const userId = getState().user.userId
  await printingEngine.updateUser({userId, user})
  return dispatch(createAction(TYPE.USER.UPDATED)(user))
}

export const updateLocation = address => async (dispatch, getState) => {
  dispatch(shippingAddressChanged(address))

  if (!isAddressValid(address)) {
    // Open address modal if address is not valid
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
  const user = getState().user.user
  const oldShippingAddress = user.shippingAddress
  const oldOffer = getState().price.selectedOffer
  const newShippingAddress = form.shippingAddress

  // Send user information to Mixpanel
  identify({
    $name: `${user.shippingAddress.firstName} ${user.shippingAddress.lastName}`,
    $city: user.shippingAddress.city,
    $country: user.shippingAddress.countryCode,
    $email: user.emailAddress,
    raw: user
  })

  dispatch(openFetchingPriceModal())
  await dispatch(updateUser(form))
  await dispatch(createPriceRequest())

  const newOffer = getState().price.selectedOffer
  const hasPriceChanged = oldOffer.totalPrice !== newOffer.totalPrice
  const wasEstimatedPrice = oldOffer.priceEstimated

  if (wasEstimatedPrice) {
    dispatch(openPriceChangedModal())
  } else if (hasPriceChanged) {
    dispatch(openPriceLocationChangedModal(oldShippingAddress, newShippingAddress))
  } else {
    dispatch(goToCart())
  }
}
