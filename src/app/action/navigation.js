import {routerActions} from 'react-router-redux'

export const goToAddress = () => routerActions.push('/address')
export const goToCart = () => routerActions.push('/cart')
export const goToHome = () => (dispatch, getState) => {
  const configurationId = getState().configuration.configurationId
  if (configurationId) {
    dispatch(routerActions.push(`/configuration/${configurationId}`))
  } else {
    dispatch(routerActions.push('/'))
  }
}
export const goToSuccess = () => routerActions.push('/success')
