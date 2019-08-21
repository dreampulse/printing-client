import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import closeIcon from '../../../asset/icon/close.svg'

const CloseButton = ({classNames, size = 'default', invert = false, onClick = () => {}}) => (
  <button
    type="button"
    className={cn('CloseButton', {invert, [`size-${size}`]: true}, classNames)}
    onClick={onClick}
  >
    <Icon block source={closeIcon} title="Close" />
  </button>
)

CloseButton.propTypes = {
  ...propTypes.component,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['default', 'l']),
  invert: PropTypes.bool
}

export default CloseButton
