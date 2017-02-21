import React, {cloneElement} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const LabeledField = ({
  classNames,
  modifiers = [],
  label,
  children,
  name,
  onChange,
  value
}) => {
  const mappedChildren = React.Children.map(children, child => (
    cloneElement(child, {
      name: child.props.name || name,
      onChange: child.props.onChange || onChange,
      value: child.props.value || value
    })
  ))

  return (
    <div className={buildClassName('labeled-field', modifiers, classNames)}>
      {/* eslint-disable jsx-a11y/label-has-for */}
      <label>
        <span className="labeled-field__label">{label}</span>
        <div className="labeled-field__field">{mappedChildren}</div>
      </label>
      {/* eslint-enable jsx-a11y/label-has-for */}
    </div>
  )
}

LabeledField.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.number.isRequired
  ]),
  name: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default LabeledField
