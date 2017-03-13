import React from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from 'Action/modal'

import {MODAL_TYPE} from '../../type'
import ShippingAddressModal from './shipping-address'

const getContent = (contentType, contentProps) => {
  switch (contentType) {
    case MODAL_TYPE.SHIPPING_ADDRESS:
      return <ShippingAddressModal {...contentProps} />
    default:
      return <div />
  }
}

const Modal = ({isOpen, onModalClose, contentType, contentProps}) => (
  <Portal
    closeOnEsc={Boolean(onModalClose)}
    isOpened={isOpen}
    onClose={onModalClose}
  >
    {getContent(contentType, contentProps)}
  </Portal>
)

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  contentType: state.modal.contentType,
  contentProps: state.modal.contentProps,
  contentModifiers: state.modal.contentModifiers
})

const mapDispatchToProps = {
  onModalClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
