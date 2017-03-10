import React, {createElement} from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from '../../action/modal'

const Modal = ({isOpen, onModalClose, contentFactory, contentProps}) => (
  <Portal
    closeOnEsc
    isOpened={isOpen}
    onClose={onModalClose}
  >
    {createElement(contentFactory || 'div', contentProps)}
  </Portal>
)

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  contentFactory: state.modal.contentFactory,
  contentProps: state.modal.contentProps,
  contentModifiers: state.modal.contentModifiers
})

const mapDispatchToProps = {
  onModalClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
