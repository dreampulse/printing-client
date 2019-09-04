import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

import CloseButton from '../close-button'

const Modal = ({
  size = 'default',
  classNames,
  onClose,
  children,
  headline,
  scrollContainerId,
  buttons
}) => (
  <section
    id={scrollContainerId}
    className={buildClassName('Modal', {[`size-${size}`]: true}, classNames)}
  >
    <header className="Modal__header">
      <div className="Modal__headline">
        {headline}
        {onClose && <CloseButton onClick={onClose} />}
      </div>
    </header>
    <div className="Modal__content">{children}</div>
    <footer className="Modal__footer">{buttons}</footer>
  </section>
)

Modal.propTypes = {
  ...propTypes.component,
  size: PropTypes.oneOf(['default', 'l', 's']),
  onClose: PropTypes.func,
  children: PropTypes.node,
  headline: PropTypes.node.isRequired,
  buttons: PropTypes.node.isRequired,
  scrollContainerId: PropTypes.string
}

export default Modal
