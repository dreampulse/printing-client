// @flow

import {createAction} from 'redux-actions'

import type {Address} from '../type'
import TYPE, {MODAL_TYPE} from '../action-type'

export const open = createAction(
  TYPE.MODAL.OPEN,
  (contentType: string, contentProps: ?any, isCloseable: ?boolean) => ({
    contentType,
    contentProps,
    isCloseable
  })
)

export const close = createAction(TYPE.MODAL.CLOSE)

export const openAddressModal = () => open(MODAL_TYPE.SHIPPING_ADDRESS, undefined, false)

export const openFetchingPriceModal = () => open(MODAL_TYPE.FETCHING_PRICE)

export const openPriceLocationChangedModal = (
  oldShippingAddress: Address,
  newShippingAddress: Address
) =>
  open(MODAL_TYPE.PRICE_LOCATION_CHANGED, {
    oldShippingAddress,
    newShippingAddress
  })

export const openPriceChangedModal = () => open(MODAL_TYPE.PRICE_CHANGED)

export const openMaterialModal = ({materialId}: {materialId: string}) =>
  open(MODAL_TYPE.MATERIAL, {materialId})

export const openFinishGroupModal = ({
  materialId,
  finishGroupId
}: {
  materialId: string,
  finishGroupId: string
}) => open(MODAL_TYPE.FINISH_GROUP, {materialId, finishGroupId})

export const openFatalErrorModal = (error: Error) => open(MODAL_TYPE.FATAL_ERROR, {error}, false)
