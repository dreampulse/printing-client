// @flow

// Note: This code is not tested,
// because the route-middleware handles this

import {push, RouterAction} from 'react-router-redux'

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
  } = {},
  routerAction: RouterAction = push
) => routerAction('/', {notification, selectModelConfigIds})
export const goToMaterial = (configIds: Array<ConfigId>, routerAction: RouterAction = push) =>
  routerAction('/material', {configIds})
export const goToCart = (
  {
    numAddedItems,
    selectModelConfigIds
  }: {
    numAddedItems?: number,
    selectModelConfigIds?: Array<ConfigId>
  } = {},
  routerAction: RouterAction = push
) => routerAction('/cart', {numAddedItems, selectModelConfigIds})
export const goToAddress = (section: ?AddressPageSection, routerAction: RouterAction = push) =>
  routerAction('/address', {section})
export const goToReviewOrder = (routerAction: RouterAction = push) => routerAction('/review-order')
export const goToSuccess = (state: SuccessPageRouteState, routerAction: RouterAction = push) =>
  routerAction('/success', state)
