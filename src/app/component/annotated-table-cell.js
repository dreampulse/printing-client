import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const AnnotatedTableCell = ({classNames, modifiers, value, annotation = ''}) => (
  <div className={buildClassName('annotated-table-cell', modifiers, classNames)}>
    <span className="annotated-table-cell__value">{value}</span>
    {annotation && <span className="annotated-table-cell__annotation">{annotation}</span>}
  </div>
)

AnnotatedTableCell.propTypes = {
  ...propTypes.component,
  value: PropTypes.string.isRequired,
  annotation: PropTypes.string
}

export default AnnotatedTableCell
