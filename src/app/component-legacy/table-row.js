import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import TableCell from './table-cell'
import Checkbox from './checkbox'

const TableRow = ({
  children,
  modifiers,
  classNames,
  bulkActions,  // injected by the parent
  selected,
  onChangeSelect
}) => {
  const select = () => (
    <TableCell modifiers={['checkbox']} key="check-all">
      <Checkbox checked={selected} onChange={onChangeSelect} />
    </TableCell>
  )

  const rowChildren = bulkActions ? [select(), ...children] : children

  return (
    <tr className={buildClassName('table-row', modifiers, classNames)}>{rowChildren}</tr>
  )
}

TableRow.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired,
  selected: React.PropTypes.bool,
  onChangeSelect: React.PropTypes.func
}

export default TableRow
