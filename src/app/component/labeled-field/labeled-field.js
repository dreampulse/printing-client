import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const LabeledField = ({classNames, modifiers = [], label, children}) => (
  <div className={buildClassName('labeled-field', modifiers, classNames)}>
    <span className="labeled-field__label">{label}</span>
    <div className="labeled-field__field">{children}</div>
  </div>
)

LabeledField.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default LabeledField
