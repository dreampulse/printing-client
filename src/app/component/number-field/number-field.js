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
  setFocus,
  name = ''
}) => {
  const handleLessClick = event => {
    event.preventDefault()

    const nextValue = value - 1
    if (nextValue >= lowerLimit) {
      onChange(nextValue, name, event)
    }
  }

  const handleMoreClick = event => {
    event.preventDefault()

    const nextValue = value + 1
    if (nextValue <= upperLimit) {
      onChange(nextValue, name, event)
    }
  }

  const handleInputChange = event => {
    const nextValue = parseInt(event.target.value, 10) || value
    if (nextValue < lowerLimit) {
      onChange(lowerLimit, name, event)
    } else if (nextValue > upperLimit) {
      onChange(upperLimit, name, event)
    } else {
      onChange(nextValue, name, event)
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
  disabled: PropTypes.bool,
  name: PropTypes.string
}

export default compose(withState('hasFocus', 'setFocus', false))(NumberField)
