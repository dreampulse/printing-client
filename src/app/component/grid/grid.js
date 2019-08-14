import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Grid = ({classNames, children}) => (
  <div className={cn('Grid', {}, classNames)}>{children}</div>
)

Grid.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Grid
