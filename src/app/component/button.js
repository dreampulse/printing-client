import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import selectedIcon from '../../asset/icon/selected.svg'

const Button = ({
  classNames,
  modifiers = [],
  label,
  icon,
  type = 'button',
  disabled = false,
  onClick = () => {}
}) => {
  const finalIcon = modifiers.indexOf('selected') >= 0 ? selectedIcon : icon

  return (
    <button
      className={buildClassName('button', modifiers, classNames)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {Boolean(finalIcon) && <Icon source={finalIcon} />}
      {label}
    </button>
  )
}

Button.propTypes = {
  ...propTypes.component,
  label: PropTypes.string,
  icon: PropTypes.shape({
    id: PropTypes.string
  }),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
