import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Tooltip = ({classNames, orientation = 'left', children}) => (
  <div className={cn('tooltip', {[orientation]: true}, classNames)}>{children}</div>
)

Tooltip.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  orientation: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
}

export default Tooltip
