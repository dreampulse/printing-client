import PropTypes from 'prop-types'
import React, {Component} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

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
    disabled: PropTypes.bool
  }

  static defaultProps = {
    modifiers: [], // eslint-disable-line react/default-props-match-prop-types
    type: 'text',
    onChange: () => {},
    name: '',
    value: ''
  }

  render() {
    const {id, modifiers, classNames, ...inputFieldProps} = this.props

    const inputId = id || uniqueId('uid-')
    const finalModifiers = [
      ...modifiers,
      {empty: !this.props.value},
      {disabled: this.props.disabled}
    ]
    return (
      <div className={buildClassName('input-field', finalModifiers, classNames)}>
        <input id={inputId} className="input-field__input" {...inputFieldProps} />
        <label htmlFor={inputId} className="input-field__label">
          {this.props.label}
        </label>
      </div>
    )
  }
}
