import {bindActionCreators} from 'redux'

import {goToAddress} from '../action/navigation'
// import * as printingEngine from '../lib/printing-engine'
import * as actionCreator from '../action-creator'

// export const createShoppingCart = () => async (dispatch, getState) => {
//   const options = {
//     userId: getState().user.userId,
//     priceId: getState().price.priceId,
//     items: [{
//       modelId: getState().model.modelId,
//       materialId: getState().material.selected,
//       vendorId: getState().cart.selectedVendor,
//       quantity: getState().cart.quantity
//     }],
//     shipping: [{
//       name: getState().cart.selectedShipping,
//       vendorId: getState().cart.selectedVendor
//     }]
//   }
//   const {cartId} = await printingEngine.createShoppingCart(options)
//   dispatch(createAction(TYPE.CART.REQUEST_CREATED)(cartId))
//
//   const cart = await printingEngine.getFinalCartPrice({cartId})
//   dispatch(createAction(TYPE.CART.RECEIVED_FINAL_PRICE)(cart))
// }

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
