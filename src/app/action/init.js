// @flow

import type {Dispatch} from 'redux'

import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

export const init = () => async (dispatch: Dispatch<*>) => {
  await dispatch(getMaterials())
  try {
    await dispatch(detectAddress())
    await dispatch(createUser())
  } catch (error) {
    await dispatch(openAddressModal())
  }
}
