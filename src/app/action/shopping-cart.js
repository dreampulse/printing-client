import {createAction} from 'redux-actions'

import TYPE from '../../../src/app/type'
import * as printingEngine from '../lib/printing-engine'
// import pollApi from '../lib/poll-api'

export const createShoppingCart = () => async (dispatch, getState) => {
  const user = {
    currency: 'USD',
    shippingAddress: {
      city: 'Pittsburgh',
      zipCode: '15234',
      stateCode: 'PA',
      countryCode: 'US'
    }
  }

  const modelId = getState().model.modelId
  const priceId = getState().price.priceId

  const {userId} = await printingEngine.createUser({user})
  const materials = await printingEngine.listMaterials()
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

  dispatch(createAction(TYPE.SHOPPING_CART.REQUEST_CREATED)(cartId))

  // TODO: Update user with real data

  const cartPrice = await printingEngine.getFinalCartPrice({cartId})
  dispatch(createAction(TYPE.SHOPPING_CART.RECEIVED_FINAL_PRICE)(cartPrice))
}
