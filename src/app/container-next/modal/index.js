import React, {createElement} from 'react'
import {connect} from 'react-redux'
import {Portal} from 'react-portal'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'

import {CONTENT_TYPE, close} from '../../action-next/modal'
import FatalErrorModal from './fatal-error'
import ModelViewerModal from './model-viewer'
import MaterialModal from './material'
import FinishGroupModal from './finish-group'
import PickLocationModal from './pick-location'
import ConfirmLocationChangeModal from './confirm-location-change'
import ConfirmCurrencyChangeModal from './confirm-currency-change'

const modals = {
  [CONTENT_TYPE.FATAL_ERROR]: FatalErrorModal,
  [CONTENT_TYPE.MODEL_VIEWER]: ModelViewerModal,
  [CONTENT_TYPE.MATERIAL]: MaterialModal,
  [CONTENT_TYPE.FINISH_GROUP]: FinishGroupModal,
  [CONTENT_TYPE.PICK_LOCATION]: PickLocationModal,
  [CONTENT_TYPE.CONFIRM_LOCATION_CHANGE]: ConfirmLocationChangeModal,
  [CONTENT_TYPE.CONFIRM_CURRENCY_CHANGE]: ConfirmCurrencyChangeModal
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

const Modal = ({isOpen, contentType, contentProps, isCloseable, showWarning}) =>
  isOpen && (
    <Portal>
      {getContent(contentType, contentProps, {
        isCloseable,
        showWarning
      })}
    </Portal>
  )

const mapStateToProps = state => ({
  ...state.modal.modalConfig,
  isOpen: state.modal.isOpen
})

const mapDispatchToProps = {
  onModalClose: close
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
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
