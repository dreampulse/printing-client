import {bindActionCreators} from 'redux'

import {goToAddress} from '../action/navigation'
import * as printingEngine from '../lib/printing-engine'
import * as actionCreator from '../action-creator'

export const createShoppingCart = () => async (dispatch, getState) => {
  const {
    cartCreated,
    cartReceivedFinalPrice
  } = bindActionCreators(actionCreator, dispatch)

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
  const {payload: {cartId}} = await cartCreated(printingEngine.createShoppingCart(options))
  return cartReceivedFinalPrice(printingEngine.getFinalCartPrice({cartId}))
}

export const selectOffer = ({vendor, shippingName}) => (dispatch) => {
  const {
    cartSelectVendor,
    cartSelectShipping
  } = bindActionCreators(actionCreator, dispatch)

  cartSelectVendor(vendor)
  cartSelectShipping(shippingName)
  dispatch(goToAddress())
}

export const changeQuantity = quantitiy => actionCreator.cartChangeQuantity(quantitiy)
