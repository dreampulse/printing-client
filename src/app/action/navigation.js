import { routerActions } from 'react-router-redux'
import { createPriceRequest } from './price'

export const goToVendor = () => dispatch => {
  dispatch(createPriceRequest())
  dispatch(routerActions.push('/vendor'))
}

export const goToCart = () => dispatch => {
  dispatch(routerActions.push('/cart'))
}
