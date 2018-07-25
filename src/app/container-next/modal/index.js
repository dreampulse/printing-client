import React, {createElement} from 'react'
import {connect} from 'react-redux'
import {Portal} from 'react-portal'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose'

import {CONTENT_TYPE, close} from '../../action-next/modal'
import {selectModalConfig, isModalOpen} from '../../selector'
import ModelViewerModal from './model-viewer'
import MaterialModal from './material'
import PickLocationModal from './pick-location'

const modals = {
  [CONTENT_TYPE.MODEL_VIEWER]: ModelViewerModal,
  [CONTENT_TYPE.MATERIAL]: MaterialModal,
  [CONTENT_TYPE.PICK_LOCATION]: PickLocationModal
}

const getContent = (contentType, contentProps) => {
  if (contentType === null) {
    return <div />
  }
  if (contentType in modals) {
    return createElement(modals[contentType], contentProps)
  }
  throw new Error(`Unknown modal contentType "${contentType}"`)
}

const Modal = ({isOpen, contentType, contentProps}) =>
  isOpen && <Portal>{getContent(contentType, contentProps)}</Portal>

const mapStateToProps = state => ({
  ...selectModalConfig(state),
  isOpen: isModalOpen(state)
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
