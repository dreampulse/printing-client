import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const LabeledField = ({
  classNames,
  modifiers = [],
  label,
  children
}) => (
  <div className={buildClassName('labeled-field', modifiers, classNames)}>
    {/* eslint-disable jsx-a11y/label-has-for */}
    <label>
      <span className="labeled-field__label">{label}</span>
      <div className="labeled-field__field">{children}</div>
    </label>
    {/* eslint-enable jsx-a11y/label-has-for */}
  </div>
)

LabeledField.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
}

export default LabeledField
