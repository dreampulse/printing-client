import React, {createElement} from 'react'
import Portal from 'react-portal'

import {close} from '../../action/modal'

import {connectLegacy} from '../util/connect-legacy'
import {MODAL_TYPE} from '../../action-type'

import ShippingAddressModal from './shipping-address'
import MaterialModal from './material'
import FinishGroupModal from './finish-group'
import FetchingPriceModal from './fetching-price'
import PriceChangedModal from './price-changed'
import PriceLocationChangedModal from './price-location-changed'
import FatalErrorModal from './fatal-error'

const modals = {
  [MODAL_TYPE.SHIPPING_ADDRESS]: ShippingAddressModal,
  [MODAL_TYPE.MATERIAL]: MaterialModal,
  [MODAL_TYPE.FINISH_GROUP]: FinishGroupModal,
  [MODAL_TYPE.FETCHING_PRICE]: FetchingPriceModal,
  [MODAL_TYPE.PRICE_CHANGED]: PriceChangedModal,
  [MODAL_TYPE.PRICE_LOCATION_CHANGED]: PriceLocationChangedModal,
  [MODAL_TYPE.FATAL_ERROR]: FatalErrorModal
}

const getContent = (contentType, contentProps) => {
  if (contentType === null) {
    return <div />
  }
  if (contentType in modals) {
    return createElement(modals[contentType], contentProps)
  }
  throw new Error(`Unknown modal content type "${contentType}"`)
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

export default connectLegacy(mapStateToProps, mapDispatchToProps)(Modal)
