import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../lib/prop-types'
import buildClassName, {buildClassArray} from '../../lib/build-class-name'
import CheckboxField from '../checkbox-field'

const LabeledCheckbox = ({
  classNames,
  modifiers = [],
  checked,
  label,
  onChange = () => {},
  name = ''
}) => {
  const id = uniqueId('uid-')
  return (
    <div className={buildClassName('labeled-checkbox', modifiers, classNames)}>
      <CheckboxField
        name={name}
        error={modifiers.indexOf('error') > -1}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="labeled-checkbox__label">
        {label}
      </label>
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
