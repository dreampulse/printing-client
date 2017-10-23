import React, {createElement} from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from 'Action/modal'

import {MODAL_TYPE} from '../../action-type'
import ShippingAddressModal from './shipping-address'
import MaterialModal from './material'
import FetchingPriceModal from './fetching-price'
import PriceChangedModal from './price-changed'
import FatalErrorModal from './fatal-error'

const modals = {
  [MODAL_TYPE.SHIPPING_ADDRESS]: ShippingAddressModal,
  [MODAL_TYPE.MATERIAL]: MaterialModal,
  [MODAL_TYPE.FETCHING_PRICE]: FetchingPriceModal,
  [MODAL_TYPE.PRICE_CHANGED]: PriceChangedModal,
  [MODAL_TYPE.FATAL_ERROR]: FatalErrorModal
}

const getContent = (contentType, contentProps) => {
  if (modals[contentType]) {
    return createElement(modals[contentType], contentProps)
  }
  return <div />
}

const Modal = ({isOpen, onModalClose, contentType, contentProps, isCloseable}) => (
  <Portal closeOnEsc={isCloseable} isOpened={isOpen} onClose={onModalClose}>
    {getContent(contentType, contentProps)}
  </Portal>
)

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  isCloseable: state.modal.isCloseable,
  contentType: state.modal.contentType,
  contentProps: state.modal.contentProps,
  contentModifiers: state.modal.contentModifiers
})

const mapDispatchToProps = {
  onModalClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
