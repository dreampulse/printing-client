import { routerActions } from 'react-router-redux'
import { createPriceRequest } from '../action/price'

export const goToVendor = () => dispatch => {
  dispatch(createPriceRequest())
  dispatch(routerActions.push('/vendor'))
}
