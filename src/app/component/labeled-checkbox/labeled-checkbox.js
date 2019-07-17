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
  warning = false,
  onChange = () => {},
  name = ''
}) => {
  const id = uniqueId('uid-')
  return (
    <div className={cn('labeledCheckbox', {}, classNames)}>
      <CheckboxField
        name={name}
        error={error}
        id={id}
        checked={checked}
        warning={warning}
        onChange={e => onChange(!checked, name, e)}
      />
      <label htmlFor={id} className="labeledCheckbox__label">
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
  error: PropTypes.bool,
  warning: PropTypes.bool
}

export default LabeledCheckbox
