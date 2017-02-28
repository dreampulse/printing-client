import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import checkIcon from 'Icon/selected.svg'

const CheckboxField = ({
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
    <div className={buildClassName('checkbox-field', checkboxModifiers, classNames)}>
      <input name={name} id={id} className="checkbox-field__input" type="checkbox" onChange={onChange} />
      <div className="checkbox-field__checked-icon">
        <Icon source={checkIcon} />
      </div>
    </div>
  )
}

CheckboxField.propTypes = {
  ...propTypes.component,
  checked: React.PropTypes.bool,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default CheckboxField
