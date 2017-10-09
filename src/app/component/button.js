import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import selectedIcon from 'Icon/selected.svg'

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
  source: React.PropTypes.shape({
    id: React.PropTypes.string
  }),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
