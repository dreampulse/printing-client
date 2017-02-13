import {createAction} from 'redux-actions'

import TYPE from '../type'
import {goToCart} from './navigation'
import {getLocation} from '../service/geolocation'
import * as printingEngine from '../lib/printing-engine'

export const addressChanged = createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)
export const userCreated = createAction(TYPE.USER.CREATED)
export const userUpdated = createAction(TYPE.USER.UPDATED)

// Async actions

export const detectAddress = () =>
  addressChanged(getLocation())

export const createUser = () => (dispatch, getState) => {
  const user = getState().user.user
  const userPromise = printingEngine.createUser({user})
  return dispatch(userCreated(userPromise))
}

export const updateUser = user => (dispatch, getState) => {
  const userId = getState().user.userId
  const userPromise = printingEngine.updateUser({userId, user})
  return dispatch(userUpdated(userPromise))
}

export const reviewOrder = form => async (dispatch) => {
  await dispatch(updateUser(form))
  return dispatch(goToCart())
}
