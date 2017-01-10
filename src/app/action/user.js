import { createAction } from 'redux-actions'

import TYPE from '../type'
import { getLocation } from '../service/geolocation'
import * as printingEngine from '../lib/printing-engine'

export const detectAddress = () => async dispatch => {
  const shippingAddress = await getLocation()
  dispatch(createAction(TYPE.USER.SHIPPING_ADDRESS_CHANGED)(shippingAddress))
}

export const createUser = () => async (dispatch, getState) => {
  const user = getState().user.user
  const { userId } = await printingEngine.createUser({ user })
  dispatch(createAction(TYPE.USER.CREATED)(userId))
}
