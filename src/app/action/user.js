import { createAction } from 'redux-actions'

import TYPE from '../type'
import { goToCart } from './navigation'
import { getLocation } from '../service/geolocation'
import * as printingEngine from '../lib/printing-engine'

export const detectAddress = () => async dispatch => {
  try {
    const shippingAddress = await getLocation()
    dispatch(createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(shippingAddress))
  } catch (e) {
    dispatch(createAction(TYPE.USER.SHIPPING_ADDRESS_DETECTION_FAILED)())
  }
}

export const createUser = () => async (dispatch, getState) => {
  const user = getState().user.user
  const { userId } = await printingEngine.createUser({ user })
  dispatch(createAction(TYPE.USER.CREATED)(userId))
}

export const updateUser = user => async (dispatch, getState) => {
  const userId = getState().user.userId
  await printingEngine.updateUser({ userId, user })
  dispatch(createAction(TYPE.USER.UPDATED)(user))
  dispatch(goToCart())
}
