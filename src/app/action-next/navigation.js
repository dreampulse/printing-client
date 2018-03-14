// @flow

// Note: This code is not tested,
// because the route-middleware handles this

import {push} from 'react-router-redux'

export const goToUpload = () => push('/')
export const goToMaterial = () => push('/material')
export const goToCart = () => push('/cart')
