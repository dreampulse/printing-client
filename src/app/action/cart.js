import {createAction} from 'redux-actions'

import TYPE from '../type'

import * as printingEngine from '../lib/printing-engine'

// Async actions
export const createShoppingCart = () => async (dispatch, getState) => {
  const items = Object.keys(getState().model.models)
  .map(modelId => getState().model.models[modelId])
  .map(model => ({
    modelId: model.modelId,
    vendorId: getState().cart.selectedVendor,
    quantity: getState().model.models[model.modelId].quantity,
    materialId: getState().material.selectedMaterial
  }))

  const shipping = items.map(() => ({
    name: getState().cart.selectedShipping,
    vendorId: getState().cart.selectedVendor
  }))

  const options = {
    userId: getState().user.userId,
    priceId: getState().price.priceId,
    items,
    shipping
  }

  const shoppingCartPromise = printingEngine.createShoppingCart(options)
  const {payload: {cartId}} = await dispatch(createAction(TYPE.CART.CREATED)(shoppingCartPromise))

  const finalCartPricePromise = printingEngine.getFinalCartPrice({cartId})
  return await dispatch(createAction(TYPE.CART.RECEIVED_FINAL_PRICE)(finalCartPricePromise))
}

export const selectOffer = ({offer}) => createAction(TYPE.CART.OFFER_SELECTED)({offer})
