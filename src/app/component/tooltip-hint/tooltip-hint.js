import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const TooltipHint = ({children, tooltip, classNames, show = false}) => (
  <div className={cn('TooltipHint', {show}, classNames)}>
    {children}
    <div className="TooltipHint__tooltip">
      {React.cloneElement(tooltip, {orientation: 'bottom'})}
    </div>
  </div>
)

TooltipHint.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.node.isRequired,
  show: PropTypes.bool
}

export default TooltipHint
