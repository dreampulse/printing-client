import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

const Button = ({
  classNames,
  label,
  icon,
  type = 'button',
  disabled = false,
  minor = false,
  tiny = false,
  compact = false,
  text = false,
  block = false,
  iconOnly = false,
  onClick = () => {}
}) => (
  <button
    className={cn('Button', {minor, tiny, compact, text, block, iconOnly}, classNames)}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {icon && <Icon source={icon} />}
    {label && <span className="Button__label">{label}</span>}
  </button>
)

Button.propTypes = {
  ...propTypes.component,
  label: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string
  }),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  minor: PropTypes.bool,
  tiny: PropTypes.bool,
  compact: PropTypes.bool,
  text: PropTypes.bool,
  block: PropTypes.bool,
  iconOnly: PropTypes.bool
}

export default Button
