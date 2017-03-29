import {createAction} from 'redux-actions'

import TYPE from '../type'

import * as printingEngine from '../lib/printing-engine'

// TODO: the create shopping cart will be removed at the next backend release
export const createShoppingCart = () => async (dispatch, getState) => {
  const options = {
    userId: getState().user.userId,
    priceId: getState().price.priceId,
    offerId: getState().cart.selectedOffer.offerId
  }

  const shoppingCartPromise = printingEngine.createShoppingCart(options)
  await dispatch(createAction(TYPE.CART.CREATED)(shoppingCartPromise))
}

export const selectOffer = ({offer}) => createAction(TYPE.CART.OFFER_SELECTED)({offer})
