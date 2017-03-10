import {createAction} from 'redux-actions'
import getLocation from 'Lib/geolocation'
import * as printingEngine from 'Lib/printing-engine'

import TYPE from '../type'
import {goToCart} from './navigation'
import {createShoppingCart} from './cart'

export const detectAddress = () =>
  createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(getLocation())

export const createUser = () => (dispatch, getState) => {
  const user = getState().user.user
  const userPromise = printingEngine.createUser({user})
  return dispatch(createAction(TYPE.USER.CREATED)(userPromise))
}

export const updateUser = user => async (dispatch, getState) => {
  const userId = getState().user.userId
  await printingEngine.updateUser({userId, user})
  return dispatch(createAction(TYPE.USER.UPDATED)(user))
}

export const reviewOrder = form => async (dispatch) => {
  await dispatch(updateUser(form))
  await dispatch(createShoppingCart())
  return dispatch(goToCart())
}
