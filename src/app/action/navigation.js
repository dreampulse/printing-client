import {routerActions} from 'react-router-redux'

export const goBack = () => routerActions.goBack()
export const goToAddress = () => routerActions.push('/address')
export const goToCart = () => routerActions.push('/cart')
export const goToHome = () => routerActions.push('/model')
