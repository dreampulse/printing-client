import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../lib/prop-types'
import buildClassName, {buildClassArray} from '../lib/build-class-name'
import CheckboxField from './checkbox-field'

const LabeledCheckbox = ({
  classNames,
  modifiers = [],
  checked,
  label,
  onChange = () => {},
  name = ''
}) => {
  const id = uniqueId('uid-')
  const inputModifiers = buildClassArray({error: modifiers.indexOf('error') > -1})
  return (
    <div className={buildClassName('labeled-checkbox', modifiers, classNames)}>
      <CheckboxField
        name={name}
        modifiers={inputModifiers}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="labeled-checkbox__label">{label}</label>
    </div>
  )
}

LabeledCheckbox.propTypes = {
  ...propTypes.component,
  checked: React.PropTypes.bool,
  label: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  name: React.PropTypes.string
}

export default LabeledCheckbox
