import React, {createElement} from 'react'
import {connect} from 'react-redux'
import {Portal} from 'react-portal'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'

import {ModalContentType} from '../../type'
import {closeModal} from '../../action/modal'
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
  [ModalContentType.ERROR]: ErrorModal,
  [ModalContentType.ADDRESS_FORM]: AddressFormModal
}

const getContent = (contentType, contentProps, meta) => {
  if (contentType === null) {
    return <div />
  }
  if (contentType in modals) {
    return createElement(modals[contentType], {...contentProps, meta})
  }
  throw new Error(`Unknown modal contentType "${contentType}"`)
}

const Modal = ({isOpen, contentType, contentProps, isCloseable}) =>
  isOpen && (
    <Portal>
      {getContent(contentType, contentProps, {
        isCloseable
      })}
    </Portal>
  )

const mapStateToProps = state => ({
  ...state.modal.modalConfig,
  isOpen: state.modal.isOpen
})

const mapDispatchToProps = {
  onModalClose: closeModal
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.handleKeyDown = event => {
        if (this.props.isOpen && this.props.isCloseable && event.keyCode === 27) {
          this.props.onModalClose()
        }
      }

      global.addEventListener('keydown', this.handleKeyDown, false)
    },
    componentWillUnmount() {
      global.removeEventListener('keydown', this.handleKeyDown, false)
    }
  })
)

export default enhance(Modal)
