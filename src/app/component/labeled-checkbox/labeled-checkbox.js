import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'
import CheckboxField from '../checkbox-field'

const LabeledCheckbox = ({
  classNames,
  checked,
  label,
  error = false,
  onChange = () => {},
  name = ''
}) => {
  const id = uniqueId('uid-')
  return (
    <div className={cn('labeled-checkbox', {}, classNames)}>
      <CheckboxField
        name={name}
        error={error}
        id={id}
        checked={checked}
        onChange={e => onChange(!checked, name, e)}
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
  name: PropTypes.string,
  error: PropTypes.bool
}

export default LabeledCheckbox
