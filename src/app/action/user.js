import { createAction } from 'redux-actions'

import TYPE from '../../../src/app/type'
import { getLocation } from '../service/geolocation'
import * as printingEngine from '../lib/printing-engine'

export const createUser = () => async (dispatch) => {
  const user = {
    currency: 'USD',
    shippingAddress: await getLocation()
  }

  const { userId } = await printingEngine.createUser({ user })

  dispatch(createAction(TYPE.USER.CREATED)(userId))
}
