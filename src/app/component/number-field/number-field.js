import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import plusIcon from '../../../asset/icon/plus.svg'
import minusIcon from '../../../asset/icon/minus.svg'

const NumberField = ({
  classNames,
  value = null,
  onChange = () => {},
  lowerLimit = 1,
  upperLimit = 999
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

  return (
    <div className={cn('NumberField', {}, classNames)}>
      <button
        type="button"
        className="NumberField__less"
        onClick={handleLessClick}
        disabled={hasLowerLimit}
      >
        <Icon source={minusIcon} />
      </button>
      <input
        type="number"
        className="NumberField__value"
        value={typeof value === 'number' ? value : ''}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="NumberField__more"
        onClick={handleMoreClick}
        disabled={hasUpperLimit}
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

export default NumberField
