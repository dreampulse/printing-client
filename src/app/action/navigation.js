import {routerActions} from 'react-router-redux'

// TODO: remove
export const goBack = () => routerActions.goBack()
export const goToAddress = () => routerActions.push('/address')
export const goToCart = () => routerActions.push('/cart')
export const goToHome = () => routerActions.push('/')
export const goToSuccess = () => routerActions.push('/success')
