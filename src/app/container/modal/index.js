import React, {createElement} from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from 'Action/modal'

import {MODAL_TYPE} from '../../type'
import ShippingAddressModal from './shipping-address'
import FetchingPriceModal from './fetching-price'

const modals = {
  [MODAL_TYPE.SHIPPING_ADDRESS]: ShippingAddressModal,
  [MODAL_TYPE.FETCHING_PRICE]: FetchingPriceModal
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
