// @flow

import type {Dispatch} from 'redux'

import {detectAddress, createUser} from './user'
import {getMaterials} from './material'
import {openAddressModal} from './modal'

export const init = () => async (dispatch: Dispatch<*>) => {
  await dispatch(getMaterials())
  try {
    const detectAddressPromise = dispatch(detectAddress())
    const createUserPromise = dispatch(createUser())

    await [detectAddressPromise, createUserPromise]
  } catch (error) {
    await dispatch(openAddressModal())
  }
}
