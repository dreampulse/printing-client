import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const LabeledField = ({
  classNames,
  modifiers = [],
  label,
  children
}) => (
  <div className={buildClassName('labeled-field', modifiers, classNames)}>
    <span className="labeled-field__label">{label}</span>
    <div className="labeled-field__field">{children}</div>
  </div>
)

LabeledField.propTypes = {
  ...propTypes.component,
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
}

export default LabeledField
