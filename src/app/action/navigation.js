import {routerActions} from 'react-router-redux'

import {createUser} from '../action/user'

// Push the new path without overwriting the search-query
const pushPath = pathname => (dispatch, getState) => {
  const search = getState().routing.location.search

  return dispatch(routerActions.push({pathname, search}))
}

export const goToAddress = () => pushPath('/address')
export const goToReviewOrder = () => pushPath('/review-order')
export const goToCart = () => pushPath('/cart')
export const goToHome = () => (dispatch, getState) => {
  const configurationId = getState().configuration.configurationId
  if (configurationId) {
    dispatch(pushPath(`/configuration/${configurationId}`))
  } else {
    dispatch(pushPath('/'))
  }
}
export const goToSuccess = () => async dispatch => {
  await dispatch(pushPath('/success'))
  await dispatch(createUser())
}
