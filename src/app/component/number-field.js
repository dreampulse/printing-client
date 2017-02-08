import React, {PropTypes} from 'react'
import {
  compose,
  withState
} from 'recompose'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import placeholderIcon from '../../asset/icon/placeholder.svg'

const NumberField = ({
  classNames,
  modifiers = [],
  value,
  onChange = () => {},
  lowerLimit = 1,
  upperLimit = Number.MAX_SAFE_INTEGER,
  disabled = false,
  hasFocus,
  setFocus
}) => {
  const handleLessClick = (event) => {
    event.preventDefault()

    const nextValue = value - 1
    if (nextValue >= lowerLimit) {
      onChange(nextValue)
    }
  }

  const handleMoreClick = (event) => {
    event.preventDefault()

    const nextValue = value + 1
    if (nextValue <= upperLimit) {
      onChange(nextValue)
    }
  }

  const handleInputChange = (event) => {
    const nextValue = event.target.value
    if (nextValue < lowerLimit) {
      onChange(lowerLimit)
    } else if (nextValue > upperLimit) {
      onChange(upperLimit)
    } else {
      onChange(nextValue)
    }
  }

  const hasLowerLimit = value === lowerLimit
  const hasUpperLimit = value === upperLimit
  const finalModifiers = [
    ...modifiers,
    {
      focus: hasFocus,
      disabled
    }
  ]

  return (
    <div className={buildClassName('number-field', finalModifiers, classNames)}>
      <button
        type="button"
        className="number-field__less"
        onClick={handleLessClick}
        disabled={disabled || hasLowerLimit}
      >
        <Icon source={placeholderIcon} />
      </button>
      <input
        type="number"
        className="number-field__value"
        value={value}
        onChange={handleInputChange}
        onFocus={() => { setFocus(true) }}
        onBlur={() => { setFocus(false) }}
        disabled={disabled}
      />
      <button
        type="button"
        className="number-field__more"
        onClick={handleMoreClick}
        disabled={disabled || hasUpperLimit}
      >
        <Icon source={placeholderIcon} />
      </button>
    </div>
  )
}

NumberField.propTypes = {
  ...propTypes.component,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  lowerLimit: PropTypes.number,
  upperLimit: PropTypes.number,
  disabled: PropTypes.bool
}

export default compose(
  withState('hasFocus', 'setFocus', false)
)(NumberField)
