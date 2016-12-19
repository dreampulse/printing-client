import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'

export const createShoppingCart = () => async (dispatch, getState) => {
  const modelId = getState().model.modelId
  const priceId = getState().price.priceId
  const userId = getState().user.userId
  const materials = getState().material

  const materialId = Object.keys(materials)[0]

  const {cartId} = await printingEngine.createShoppingCart({
    userId,
    priceId,
    items: [{
      modelId,
      materialId,
      vendorId: 'shapeways',
      quantity: 1
    }],
    shipping: [{
      name: 'USPS First-Class',
      vendorId: 'shapeways'
    }]
  })

  dispatch(createAction(TYPE.CART.REQUEST_CREATED)(cartId))

  const cartPrice = await printingEngine.getFinalCartPrice({cartId})
  dispatch(createAction(TYPE.CART.RECEIVED_FINAL_PRICE)(cartPrice))
}
