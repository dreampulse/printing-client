import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const AnnotatedTableCell = ({classNames, modifiers, children, annotation = ''}) => (
  <div className={buildClassName('annotated-table-cell', modifiers, classNames)}>
    <span className="annotated-table-cell__value">{children}</span>
    <span className="annotated-table-cell__annotation">{annotation}</span>
  </div>
)

AnnotatedTableCell.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  annotation: PropTypes.string
}

export default AnnotatedTableCell
