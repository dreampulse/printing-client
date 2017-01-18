import React from 'react'

import Icon from './icon'
import Headline from './headline'
import closeIcon from '../../asset/icon/close.svg'
import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Modal = ({classNames, modifiers, children, title, onClose}) => (
  <section className={buildClassName('modal', modifiers, classNames)}>
    <header className="modal__header">
      <Headline label={title} />
      <button className="modal__icon" onClick={onClose}>
        <Icon source={closeIcon} />
      </button>
    </header>
    <div className="modal__body">{children}</div>
  </section>
)

Modal.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  onClose: React.PropTypes.func.isRequired
}

export default Modal
