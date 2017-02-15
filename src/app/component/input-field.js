import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const InputField = ({
  modifiers = [],
  classNames,
  label,
  value,
  type = 'text',
  onChange = () => {},
  name = ''
}) => {
  let inputFieldModifiers = modifiers

  if (!value) {
    inputFieldModifiers = [...inputFieldModifiers, 'empty']
  }

  const id = uniqueId('uid-')

  return (
    <div className={buildClassName('input-field', inputFieldModifiers, classNames)}>
      <input name={name} id={id} className="input-field__input" type={type} value={value} onChange={onChange} />
      <label htmlFor={id} className="input-field__label">{label}</label>
    </div>
  )
}

InputField.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.number.isRequired
  ]),
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default InputField
