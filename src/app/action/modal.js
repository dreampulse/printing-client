import {createAction} from 'redux-actions'

import TYPE, {MODAL_TYPE} from '../type'

export const open = ({contentType, contentProps, isCloseable}) =>
  createAction(TYPE.MODAL.OPEN)({contentType, contentProps, isCloseable})

export const close = createAction(TYPE.MODAL.CLOSE)

export const openAddressModal = () =>
  open({contentType: MODAL_TYPE.SHIPPING_ADDRESS, isCloseable: false})

export const openFetchingPriceModal = () =>
  open({contentType: MODAL_TYPE.FETCHING_PRICE})

export const openPriceChangedModal = props =>
  open({contentType: MODAL_TYPE.PRICE_CHANGED, contentProps: props})

export const openMaterialModal = ({materialId, finishGroupId}) =>
  open({
    contentType: MODAL_TYPE.MATERIAL,
    contentProps: {materialId, finishGroupId}
  })

export const openFatalErrorModal = error =>
  open({
    contentType: MODAL_TYPE.FATAL_ERROR,
    contentProps: {error},
    isCloseable: false
  })
