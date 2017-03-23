import React, {createElement} from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from 'Action/modal'

import {MODAL_TYPE} from '../../type'
import ShippingAddressModal from './shipping-address'
import MaterialModal from './material'
import FetchingPriceModal from './fetching-price'
import PriceChangedModal from './price-changed'

const modals = {
  [MODAL_TYPE.SHIPPING_ADDRESS]: ShippingAddressModal,
  [MODAL_TYPE.MATERIAL]: MaterialModal,
  [MODAL_TYPE.FETCHING_PRICE]: FetchingPriceModal,
  [MODAL_TYPE.PRICE_CHANGED]: PriceChangedModal
}

const getContent = (contentType, contentProps) => {
  if (modals[contentType]) {
    return createElement(modals[contentType], contentProps)
  }
  return <div />
}

const Modal = ({isOpen, onModalClose, contentType, contentProps, isClosable}) => (
  <Portal
    closeOnEsc={isClosable}
    isOpened={isOpen}
    onClose={onModalClose}
  >
    {getContent(contentType, contentProps)}
  </Portal>
)

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  isClosable: state.modal.isClosable,
  contentType: state.modal.contentType,
  contentProps: state.modal.contentProps,
  contentModifiers: state.modal.contentModifiers
})

const mapDispatchToProps = {
  onModalClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
