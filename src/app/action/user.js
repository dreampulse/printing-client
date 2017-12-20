// @flow

import type {Dispatch} from 'redux'
import {createAction} from 'redux-actions'
import {getLocationByIp, isAddressValid} from 'Lib/geolocation'
import * as printingEngine from 'Service/printing-engine'
import {identify, peopleSet} from 'Service/mixpanel'
import {setUserContext} from 'Service/logging'
import {normalizeTelephoneNumber} from 'Lib/normalize'

import type {Address, User, State} from '../type'
import type {Location} from '../type-next'
import TYPE from '../action-type'

import {goToCart} from './navigation'

import {
  openAddressModal,
  openPriceChangedModal,
  openPriceLocationChangedModal,
  openFetchingPriceModal
} from './modal'
import {createPriceRequest, recalculateSelectedOffer} from './price'

const shippingAddressChanged = createAction(
  TYPE.USER.SHIPPING_ADDRESS_CHANGED,
  // The Location type is the smallest common denominator of an acceptable address
  (address: Location) => ({address})
)
const userCreated = createAction(TYPE.USER.CREATED, (userId: string) => ({userId}))
const userUpdated = createAction(TYPE.USER.UPDATED, (user: User) => user)

// Async actions

export const detectAddress = () => async (dispatch: Dispatch<*>) => {
  const location = await getLocationByIp()
  dispatch(shippingAddressChanged(location))
}

export const createUser = () => async (dispatch: Dispatch<*>, getState: () => State) => {
  const user = getState().user.user
  const {userId} = await printingEngine.createUser({user})
  identify(userId) // Send user information to Mixpanel
  setUserContext({
    id: userId
  })
  return dispatch(userCreated(userId))
}

export const updateUser = (user: User) => async (dispatch: Dispatch<*>, getState: () => State) => {
  const userId = getState().user.userId
  await printingEngine.updateUser({userId, user})
  return dispatch(userUpdated(user))
}

export const updateLocation = (address: Address) => async (
  dispatch: Dispatch<*>,
  getState: () => State
) => {
  dispatch(shippingAddressChanged(address))

  if (!isAddressValid(address)) {
    // Open address modal if address is not valid
    dispatch(openAddressModal())
  } else {
    if (!getState().user.userId) {
      // No user created so far
      await dispatch(createUser())
    } else {
      await dispatch(updateUser(getState().user.user))
    }

    // Update prices
    dispatch(createPriceRequest())
  }
}

// @TODO update type
export const reviewOrder = (form: any) => async (dispatch: Dispatch<*>, getState: () => State) => {
  const user = getState().user.user
  const oldShippingAddress = user.shippingAddress
  const oldOffer = getState().price.selectedOffer
  const newShippingAddress = form.shippingAddress

  form.phoneNumber = normalizeTelephoneNumber(form.phoneNumber)

  // Send user information to Mixpanel
  peopleSet({
    $name: `${form.shippingAddress.firstName} ${form.shippingAddress.lastName}`,
    $city: form.shippingAddress.city,
    $country: form.shippingAddress.countryCode,
    $email: form.emailAddress,
    raw: form
  })

  setUserContext({
    email: form.emailAddress,
    id: getState().user.userId
  })

  dispatch(openFetchingPriceModal())
  await dispatch(updateUser(form))
  await dispatch(recalculateSelectedOffer())

  const newOffer = getState().price.selectedOffer
  if (!newOffer || !oldOffer) throw new Error('No offer slected')

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
