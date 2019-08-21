import PropTypes from 'prop-types'
import React from 'react'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'

const LabeledField = ({classNames, label, children}) => (
  <div className={cn('LabeledField', {}, classNames)}>
    <span className="LabeledField__label">{label}</span>
    <div className="LabeledField__field">{children}</div>
  </div>
)

LabeledField.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default LabeledField
