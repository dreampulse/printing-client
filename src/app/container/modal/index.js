import React, {createElement} from 'react'
import {connect} from 'react-redux'
import Portal from 'react-portal'

import {close} from '../../action/modal'

// import Portal from '../../component-legacy/portal'
// import ModalComponent from '../../component-legacy/modal'

const Modal = ({title, isOpen, onModalClose, contentFactory, contentProps, contentModifiers}) => (
  <Portal
    closeOnEsc
    closeOnOutsideClick
    isOpened={isOpen}
    onClose={onModalClose}
  >
    {createElement(contentFactory || 'div', contentProps)}
  </Portal>
)

  // <Portal modifiers={['modal', ...contentModifiers]} isOpen={isOpen} onRequestClose={onModalClose}>
  //   <ModalComponent title={title} onClose={onModalClose}>
  //     {createElement(contentFactory || 'div', contentProps)}
  //   </ModalComponent>
  // </Portal>

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  contentFactory: state.modal.contentFactory,
  contentProps: state.modal.contentProps,
  title: state.modal.title,
  contentModifiers: state.modal.contentModifiers
})

const mapDispatchToProps = {
  onModalClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
