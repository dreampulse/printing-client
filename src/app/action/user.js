import {goToCart} from './navigation'

import {getLocation} from '../service/geolocation'
import * as printingEngine from '../lib/printing-engine'
import {userAddressChanged, userCreated, userUpdated} from '../action-creator'

// Epics

export const detectAddress = () =>
  userAddressChanged(getLocation())

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
