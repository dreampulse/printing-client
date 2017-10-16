import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from 'Lib/prop-types'
import buildClassName, {buildClassArray} from 'Lib/build-class-name'
import CheckboxField from 'Component/checkbox-field'

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
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string
}

export default LabeledCheckbox
