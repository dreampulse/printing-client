import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const RadioButton = ({
  classNames,
  modifiers = [],
  name,
  label,
  value,
  checked,
  disabled = false,
  onClick = () => {}
}) => {
  const buttonId = uniqueId('radio-button-')
  return (
    <label
      htmlFor={buttonId}
      className={buildClassName('radio-button', modifiers, classNames)}
      aria-checked={checked}
      aria-disabled={disabled}
    >
      <input
        className="radio-button__input"
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
  disabled: PropTypes.bool
}

export default RadioButton
