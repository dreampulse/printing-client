import React from 'react'
import uniqueId from 'lodash/uniqueId'

import Icon from './icon'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import dateIcon from '../../asset/icon/date.svg'
import timeIcon from '../../asset/icon/time.svg'

const InputField = ({modifiers = [], classNames, icon, label, value, type = 'text', ...params}) => {
  let inputFieldIcon = icon
  let inputFieldModifiers = modifiers

  if (type === 'date') {
    inputFieldIcon = dateIcon
  }

  if (type === 'time') {
    inputFieldIcon = timeIcon
  }

  if (!value) {
    inputFieldModifiers = [...inputFieldModifiers, 'empty']
  }

  if (icon) {
    inputFieldModifiers = [...inputFieldModifiers, 'has-icon']
  }

  const id = uniqueId('uid-')

  return (
    <div className={buildClassName('input-field', inputFieldModifiers, classNames)}>
      <input id={id} className="input-field__input" type={type} value={value} {...params} />
      <label htmlFor={id} className="input-field__label">{label}</label>
      { inputFieldIcon
        ? <div className="input-field__icon"><Icon source={inputFieldIcon} /></div>
        : null
      }
    </div>
  )
}

InputField.propTypes = {
  ...propTypes.component,
  icon: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  type: React.PropTypes.string
}

export default InputField
