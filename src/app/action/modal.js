import {createAction} from 'redux-actions'

import TYPE, {MODAL_TYPE} from '../type'

export const open = ({contentType, contentProps}) =>
    createAction(TYPE.MODAL.OPEN)({contentType, contentProps})

export const close = createAction(TYPE.MODAL.CLOSE)

export const openAddressModal = () =>
  open({contentType: MODAL_TYPE.SHIPPING_ADDRESS})
