import React, {PropTypes} from 'react'

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
  selected = false,
  onClick = () => {}
}) => {
  const finalIcon = selected ? selectedIcon : icon
  const finalModifiers = [
    ...modifiers,
    {selected}
  ]

  return (
    <button
      className={buildClassName('button', finalModifiers, classNames)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {finalIcon ? <Icon source={finalIcon} /> : null}
      {label}
    </button>
  )
}

Button.propTypes = {
  ...propTypes.component,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
