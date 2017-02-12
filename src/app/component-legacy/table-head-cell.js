import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const TableHeadCell = ({
  children,
  modifiers = [],
  classNames
}) => (
  <th className={buildClassName('table-head-cell', modifiers, classNames)}>
    {children}
  </th>
  )

TableHeadCell.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node,
  order: React.PropTypes.string,
  onChangeOrderClicked: React.PropTypes.func
}

export default TableHeadCell
