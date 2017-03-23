import {createAction} from 'redux-actions'

import TYPE, {MODAL_TYPE} from '../type'

export const open = ({contentType, contentProps, isClosable}) =>
  createAction(TYPE.MODAL.OPEN)({contentType, contentProps, isClosable})

export const close = createAction(TYPE.MODAL.CLOSE)

export const openAddressModal = () =>
  open({contentType: MODAL_TYPE.SHIPPING_ADDRESS, isClosable: false})

export const openFetchingPriceModal = () =>
  open({contentType: MODAL_TYPE.FETCHING_PRICE, isClosable: false})

export const openPriceChangedModal = props => (dispatch) => {
  dispatch(open({contentType: MODAL_TYPE.PRICE_CHANGED, contentProps: props}))
}

export const openMaterialModal = ({materialId, finishGroupId}) =>
  open({
    contentType: MODAL_TYPE.MATERIAL,
    contentProps: {materialId, finishGroupId}
  })
