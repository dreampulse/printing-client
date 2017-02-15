import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import Icon from './icon'
import checkIcon from '../../asset/icon/selected.svg'

const InputCheckbox = ({
  classNames,
  modifiers = [],
  checked,
  id = '',
  onChange = () => {},
  name = ''
}) => {
  let checkboxModifiers = modifiers

  if (checked) {
    checkboxModifiers = [...checkboxModifiers, 'checked']
  }

  return (
    <div className={buildClassName('input-checkbox', checkboxModifiers, classNames)}>
      <input name={name} id={id} className="input-checkbox__input" type="checkbox" onChange={onChange} />
      <div className="input-checkbox__checked-icon">
        <Icon source={checkIcon} />
      </div>
    </div>
  )
}

InputCheckbox.propTypes = {
  ...propTypes.component,
  checked: React.PropTypes.bool,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default InputCheckbox
