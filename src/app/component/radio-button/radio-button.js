import PropTypes from 'prop-types'
import React from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

export default class RadioButton extends React.Component {
  static propTypes = {
    ...propTypes.component,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClick: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    tiny: PropTypes.bool
  }

  buttonId = uniqueId('radio-button-')

  render() {
    const {
      classNames,
      name,
      label,
      value,
      checked,
      disabled = false,
      onClick = () => {},
      tiny = false
    } = this.props

    return (
      <label
        htmlFor={this.buttonId}
        className={cn('RadioButton', {tiny}, classNames)}
        aria-checked={checked}
        aria-disabled={disabled}
      >
        <input
          className="RadioButton__input"
          type="radio"
          name={name}
          id={this.buttonId}
          value={value}
          onChange={onClick}
          checked={checked}
          disabled={disabled}
        />
        {label !== undefined ? label : value}
      </label>
    )
  }
}
