import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'

import CheckboxField from '../checkbox-field'

export default class LabeledCheckbox extends React.Component {
  static propTypes = {
    ...propTypes.component,
    checked: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.bool,
    warning: PropTypes.bool
  }

  fieldId = uniqueId('checkbox-field-')

  render() {
    const {
      classNames,
      checked,
      label,
      error = false,
      warning = false,
      onChange = () => {},
      name = ''
    } = this.props

    return (
      <div className={cn('LabeledCheckbox', {}, classNames)}>
        <CheckboxField
          name={name}
          error={error}
          id={this.fieldId}
          checked={checked}
          warning={warning}
          onChange={e => onChange(!checked, name, e)}
        />
        <label htmlFor={this.fieldId} className="LabeledCheckbox__label">
          {label}
        </label>
      </div>
    )
  }
}
