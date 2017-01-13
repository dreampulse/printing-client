import { routerActions } from 'react-router-redux'

export const goBack = () => routerActions.goBack()

export const goToVendor = () => routerActions.push('/vendor')

export const goToAddress = () => routerActions.push('/address')

export const goToCart = () => routerActions.push('/cart')
