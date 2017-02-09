import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const TableCell = ({children, modifiers, classNames}) => (
  <td className={buildClassName('table-cell', modifiers, classNames)}>{children}</td>
)

TableCell.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node
}

export default TableCell
