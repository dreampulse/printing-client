import {createAction} from 'redux-actions'

import TYPE from '../type'

import {goToAddress} from '../action/navigation'
import * as printingEngine from '../lib/printing-engine'

// Sync actions
export const changeQuantity = createAction(TYPE.CART.QUANTITY_CHANGED)

// Async actions
export const createShoppingCart = () => async (dispatch, getState) => {
  const items = getState().model.models.map(model => ({
    modelId: model.modelId,
    vendorId: getState().cart.selectedVendor,
    quantity: getState().cart.quantity,
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

  // TODO: why two calls?
  // Maybe there is a better point in time to call createShoppingCart()
  const shoppingCartPromise = printingEngine.createShoppingCart(options)
  const {payload: {cartId}} = await dispatch(createAction(TYPE.CART.CREATED)(shoppingCartPromise))

  const finalCartPricePromise = printingEngine.getFinalCartPrice({cartId})
  return await dispatch(createAction(TYPE.CART.RECEIVED_FINAL_PRICE)(finalCartPricePromise))
}

export const selectOffer = ({vendor, shippingName}) => (dispatch) => {
  dispatch(createAction(TYPE.CART.VENDOR_SELECTED)(vendor))
  dispatch(createAction(TYPE.CART.SHIPPING_SELECTED)(shippingName))
  dispatch(goToAddress())
}
