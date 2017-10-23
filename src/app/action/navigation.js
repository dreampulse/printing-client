import {routerActions} from 'react-router-redux'

import {createUser} from 'Action/user'

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
export const goToSuccess = () => async dispatch => {
  await dispatch(routerActions.push('/success'))
  await dispatch(createUser())
}
