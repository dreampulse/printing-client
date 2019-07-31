import React, {createElement} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {TransitionGroup} from 'react-transition-group'

import * as modalAction from '../../action/modal'
import {ModalContentType} from '../../type'
import ModalPortal from '../../component/modal-portal'

import FatalErrorModal from './fatal-error'
import ModelViewerModal from './model-viewer'
import AddressFormModal from './address-form'
import MaterialModal from './material'
import FinishGroupModal from './finish-group'
import PickLocationModal from './pick-location'
import PickUnitModal from './pick-unit'
import ConfirmLocationChangeModal from './confirm-location-change'
import ConfirmCurrencyChangeModal from './confirm-currency-change'
import ShareConfigurationModal from './share-configuration'
import ShareCartModal from './share-cart'
import ErrorModal from './error'

const modals = {
  [ModalContentType.FATAL_ERROR]: FatalErrorModal,
  [ModalContentType.MODEL_VIEWER]: ModelViewerModal,
  [ModalContentType.MATERIAL]: MaterialModal,
  [ModalContentType.FINISH_GROUP]: FinishGroupModal,
  [ModalContentType.PICK_LOCATION]: PickLocationModal,
  [ModalContentType.PICK_UNIT]: PickUnitModal,
  [ModalContentType.CONFIRM_LOCATION_CHANGE]: ConfirmLocationChangeModal,
  [ModalContentType.CONFIRM_CURRENCY_CHANGE]: ConfirmCurrencyChangeModal,
  [ModalContentType.SHARE_CONFIGURATION]: ShareConfigurationModal,
  [ModalContentType.SHARE_CART]: ShareCartModal,
  [ModalContentType.ERROR]: ErrorModal,
  [ModalContentType.ADDRESS_FORM]: AddressFormModal
}

const getContent = ({contentType, contentProps, isCloseable}, closeModal) => {
  if (contentType === null) {
    return <div />
  }

  if (contentType in modals) {
    return (
      <ModalPortal key={contentType} onClose={isCloseable ? () => closeModal() : undefined}>
        {createElement(modals[contentType], {
          ...contentProps,
          meta: {isCloseable: isCloseable}
        })}
      </ModalPortal>
    )
  }

  throw new Error(`Unknown modal contentType "${contentType}"`)
}

const Modal = ({isOpen, modalConfig, closeModal}) => (
  <TransitionGroup>{isOpen && getContent(modalConfig, closeModal)}</TransitionGroup>
)

const mapStateToProps = state => ({
  modalConfig: state.modal.modalConfig || {},
  isOpen: state.modal.isOpen
})

const mapDispatchToProps = {
  closeModal: modalAction.closeModal
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(Modal)
