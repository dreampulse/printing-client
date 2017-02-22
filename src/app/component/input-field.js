import React, {Component, PropTypes} from 'react'
import uniqueId from 'lodash/uniqueId'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

export default class InputField extends Component {

  static propTypes = {
    ...propTypes.component,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired
    ]),
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string
  }

  static defaultProps = {
    modifiers: [],
    type: 'text',
    onChange: () => {},
    name: '',
    value: ''
  }

  id = uniqueId('uid-')

  render () {
    const inputId = this.props.id || this.id
    const finalModifiers = [
      ...modifiers,
      {empty: !this.props.value}
    ]
    return (
      <div className={buildClassName('input-field', finalModifiers, this.props.classNames)}>
        <input
          name={this.props.name}
          id={inputId}
          className="input-field__input"
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <label htmlFor={inputId} className="input-field__label">{this.props.label}</label>
      </div>
    )
  }
}
