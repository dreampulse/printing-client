import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const TableFootCell = ({children, modifiers, classNames}) => (
  <td className={buildClassName('table-foot-cell', modifiers, classNames)}>{children}</td>
)

TableFootCell.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node
}

export default TableFootCell
