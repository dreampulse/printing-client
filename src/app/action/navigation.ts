import {push} from 'react-router-redux'

import {ConfigId, Notification, VendorId} from '../type'

export type SuccessPageRouteState = {
  vendorIds: VendorId[]
  orderNumber: string
}

export type AddressPageSection = 'billing-address' | 'shipping-address'

export const goToUpload = (
  {
    notification,
    selectModelConfigIds
  }: {
    notification?: Notification
    selectModelConfigIds?: ConfigId[]
  } = {},
  routerAction: any = push
) => routerAction('/', {notification, selectModelConfigIds})

export const goToMaterial = (configIds: ConfigId[], routerAction: any = push) =>
  routerAction('/material', {configIds})

export const goToEditMaterial = (configIds: ConfigId[], routerAction: any = push) =>
  routerAction('/material/edit', {configIds})

export const goToCart = (
  {
    numAddedItems,
    selectModelConfigIds
  }: {
    numAddedItems?: number
    selectModelConfigIds?: ConfigId[]
  } = {},
  routerAction: any = push
) => routerAction('/cart', {numAddedItems, selectModelConfigIds})

export const goToReviewOrder = (routerAction: any = push) => routerAction('/review-order')

export const goToSuccess = (state: SuccessPageRouteState, routerAction: any = push) =>
  routerAction('/success', state)
