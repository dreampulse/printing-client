import React from 'react'

import enhanceClassName from '../lib/enhance-class-name'
import Icon from './icon'
import Headline from './headline'
import closeIcon from '../../asset/icon/close.svg'

const Modal = ({children, title, onClose, ...params}) => (
  <section {...params}>
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
  children: React.PropTypes.node,
  title: React.PropTypes.string,
  onClose: React.PropTypes.func.isRequired
}

export default enhanceClassName('modal')(Modal)
