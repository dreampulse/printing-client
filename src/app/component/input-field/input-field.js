import PropTypes from 'prop-types'
import React, {Component} from 'react'
import uniqueId from 'lodash/uniqueId'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'

// eslint-disable-next-line react/prefer-stateless-function
export default class InputField extends Component {
  static propTypes = {
    ...propTypes.component,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    autoFocus: PropTypes.bool,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool
  }

  static defaultProps = {
    modifiers: [], // eslint-disable-line react/default-props-match-prop-types
    type: 'text',
    onChange: () => {},
    name: '',
    value: ''
  }

  render() {
    const {
      id,
      classNames,
      onChange,
      name,
      value,
      error = false,
      disabled = false,
      warning = false,
      ...inputFieldProps
    } = this.props

    const inputId = id || uniqueId('uid-')

    return (
      <div className={cn('inputField', {error, warning, disabled, empty: !value}, classNames)}>
        <input
          name={name}
          id={inputId}
          className="inputField__input"
          onChange={e => onChange(e.target.value, name, e)}
          value={value}
          {...inputFieldProps}
        />
        <label htmlFor={inputId} className="inputField__label">
          {this.props.label}
        </label>
      </div>
    )
  }
}
