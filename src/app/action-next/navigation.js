// @flow

// Note: This code is not tested,
// because the route-middleware handles this

import {push} from 'react-router-redux'

import type {ConfigId} from '../type-next'

export const goToUpload = () => push('/')
export const goToMaterial = (configIds: Array<ConfigId>) => push('/material', {configIds})
export const goToCart = (numAddedItems: ?number) => push('/cart', {numAddedItems})
export const goToAddress = () => push('/address')
export const goToReviewOrder = () => push('/review-order')
