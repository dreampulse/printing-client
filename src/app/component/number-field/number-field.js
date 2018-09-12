import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import plusIcon from '../../../asset/icon/plus.svg'
import minusIcon from '../../../asset/icon/minus.svg'

const NumberField = ({
  classNames,
  modifiers = [],
  value = null,
  onChange = () => {},
  lowerLimit = 1,
  upperLimit = 999,
  disabled = false,
  hasFocus,
  setFocus
}) => {
  const handleLessClick = event => {
    event.preventDefault()

    const nextValue = value - 1
    if (nextValue >= lowerLimit) {
      onChange(nextValue)
    }
  }

  const handleMoreClick = event => {
    event.preventDefault()

    const nextValue = value + 1
    if (nextValue <= upperLimit) {
      onChange(nextValue)
    }
  }

  const handleInputChange = event => {
    const nextValue = parseInt(event.target.value, 10) || value
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
        <Icon source={minusIcon} />
      </button>
      <input
        type="number"
        className="number-field__value"
        value={typeof value === 'number' ? value : ''}
        onChange={handleInputChange}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
        disabled={disabled}
      />
      <button
        type="button"
        className="number-field__more"
        onClick={handleMoreClick}
        disabled={disabled || hasUpperLimit}
      >
        <Icon source={plusIcon} />
      </button>
    </div>
  )
}

NumberField.propTypes = {
  ...propTypes.component,
  value: PropTypes.number,
  onChange: PropTypes.func,
  lowerLimit: PropTypes.number,
  upperLimit: PropTypes.number,
  disabled: PropTypes.bool
}

export default compose(withState('hasFocus', 'setFocus', false))(NumberField)