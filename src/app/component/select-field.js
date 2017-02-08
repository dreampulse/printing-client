import React, {PropTypes} from 'react'
import {
  compose,
  withState
} from 'recompose'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import arrowIcon from '../../asset/icon/arrow-down.svg'

const SelectField = ({
  classNames,
  modifiers = [],
  placeholder = '',
  value = '',
  colorValue,
  isOpen,
  setOpen,
  onChange
}) => {
  const onClick = (event) => {
    event.preventDefault()
    setOpen(!isOpen)
  }

  const finalModifiers = [
    ...modifiers,
    {
      selected: Boolean(value)
    }
  ]

  return (
    <button
      type="button"
      className={buildClassName('select-field', finalModifiers, classNames)}
      onClick={onClick}
    >
      <span className="select-field__value">{value || placeholder}</span>
      <Icon source={arrowIcon} />
    </button>
  )
}

SelectField.propTypes = {
  ...propTypes.component,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  colorValue: PropTypes.string,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  onChange: PropTypes.func
}

export default compose(
  withState('isOpen', 'setOpen', false)
)(SelectField)

