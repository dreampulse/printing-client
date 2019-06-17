import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const RadioButton = ({
  classNames,
  name,
  label,
  value,
  checked,
  disabled = false,
  onClick = () => {},
  tiny = false
}) => {
  const buttonId = uniqueId('radio-button-')
  return (
    <label
      htmlFor={buttonId}
      className={cn('RadioButton', {tiny}, classNames)}
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <input
        className="RadioButton__input"
        type="radio"
        name={name}
        id={buttonId}
        value={value}
        onChange={onClick}
        checked={checked}
        disabled={disabled}
      />
      {label !== undefined ? label : value}
    </label>
  )
}

RadioButton.propTypes = {
  ...propTypes.component,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  tiny: PropTypes.bool
}

export default RadioButton
