import {createAction} from 'redux-actions'

import TYPE from '../type'

import {goToAddress} from '../action/navigation'
import * as printingEngine from '../lib/printing-engine'

export const selectVendor = createAction(TYPE.CART.VENDOR_SELECTED)
export const selectShipping = createAction(TYPE.CART.SHIPPING_SELECTED)
export const changeQuantity = createAction(TYPE.CART.QUANTITY_CHANGED)
export const cartCreated = createAction(TYPE.CART.CREATED)
export const receivedFinalPrice = createAction(TYPE.CART.RECEIVED_FINAL_PRICE)

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
  const {payload: {cartId}} = await dispatch(
    cartCreated(printingEngine.createShoppingCart(options))
  )
  return dispatch(
    receivedFinalPrice(printingEngine.getFinalCartPrice({cartId}))
  )
}

export const selectOffer = ({vendor, shippingName}) => (dispatch) => {
  dispatch(selectVendor(vendor))
  dispatch(selectShipping(shippingName))
  dispatch(goToAddress())
}
