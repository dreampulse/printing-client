// @flow

// Note: This code is not tested,
// because the route-middleware handles this

import {push} from 'react-router-redux'

import type {ConfigId, Notification, VendorId} from '../type'

export type SuccessPageRouteState = {
  vendorIds: Array<VendorId>,
  orderNumber: string
}

export type AddressPageSection = 'billing-address' | 'shipping-address'

export const goToUpload = (
  {
    notification,
    selectModelConfigIds
  }: {
    notification?: Notification,
    selectModelConfigIds?: Array<ConfigId>
  } = {}
) => push('/', {notification, selectModelConfigIds})
export const goToMaterial = (configIds: Array<ConfigId>) => push('/material', {configIds})
export const goToCart = (
  {
    numAddedItems,
    selectModelConfigIds
  }: {
    numAddedItems?: number,
    selectModelConfigIds?: Array<ConfigId>
  } = {}
) => push('/cart', {numAddedItems, selectModelConfigIds})
export const goToAddress = (section: ?AddressPageSection) => push('/address', {section})
export const goToReviewOrder = () => push('/review-order')
export const goToSuccess = (state: SuccessPageRouteState) => push('/success', state)
