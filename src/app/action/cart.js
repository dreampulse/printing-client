import {createAction} from 'redux-actions'

import TYPE from '../type'
import * as printingEngine from '../lib/printing-engine'

export const createShoppingCart = () => async (dispatch, getState) => {
  const modelId = getState().model.modelId
  const { priceId, price } = getState().price
  const userId = getState().user.userId
  const materials = getState().material
  const vendorId = 'shapeways'

  const materialId = Object.keys(materials)[0]

  const {cartId} = await printingEngine.createShoppingCart({
    userId,
    priceId,
    items: [{
      modelId,
      materialId,
      vendorId,
      quantity: 1
    }],
    shipping: [{
      name: price.printingService[vendorId].shipping[0].name,
      vendorId
    }]
  })

  dispatch(createAction(TYPE.CART.REQUEST_CREATED)(cartId))

  const cartPrice = await printingEngine.getFinalCartPrice({cartId})
  dispatch(createAction(TYPE.CART.RECEIVED_FINAL_PRICE)(cartPrice))
}
