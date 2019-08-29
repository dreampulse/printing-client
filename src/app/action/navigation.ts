import {push} from 'react-router-redux'

import {ConfigId, Notification} from '../type'

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

export const goToAddress = (scrollTo?: string, routerAction: any = push) =>
  routerAction('/address', {scrollTo})

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

export const goToSuccess = (orderNumber: string, routerAction: any = push) =>
  routerAction(`/success?orderNumber=${encodeURIComponent(orderNumber)}`)
