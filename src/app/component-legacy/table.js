import React, {cloneElement} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Checkbox from './checkbox'
import HeadCell from './table-head-cell'
import FootCell from './table-foot-cell'

const Table = ({
  classNames,
  modifiers,
  rows,
  selectedAll,
  onChangeSelectAll,
  bulkActions = false,
  head = null,
  foot = null
}) => {
  const selectAll = (
    <HeadCell modifiers={['checkbox']} key="check-all">
      <Checkbox checked={selectedAll} onChange={onChangeSelectAll} />
    </HeadCell>
  )

  const tableHead = head && bulkActions ? [selectAll, ...head] : head
  const tableFoot = foot && bulkActions ? [<FootCell key="check-space" />, ...foot] : foot

  return (
    <table className={buildClassName('table', modifiers, classNames)}>
      { tableHead ? (
        <thead className="table__head">
          <tr>
            {tableHead}
          </tr>
        </thead>) : null
      }
      <tbody>
        {rows.map(row => cloneElement(row, {bulkActions}))}
      </tbody>
      { tableFoot ? (
        <tfoot>
          <tr>
            {tableFoot}
          </tr>
        </tfoot>) : null}
    </table>
  )
}

Table.propTypes = {
  ...propTypes.component,
  rows: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  selectedAll: React.PropTypes.bool,
  onChangeSelectAll: React.PropTypes.func,
  bulkActions: React.PropTypes.bool,
  head: React.PropTypes.arrayOf(React.PropTypes.node),
  foot: React.PropTypes.arrayOf(React.PropTypes.node)
}

export default Table
