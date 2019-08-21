import React from 'react'
import PropTypes from 'prop-types'

import cn from '../../lib/class-names'

const getTransform = (position, shift) => {
  switch (position) {
    case 'left':
      return `translateY(${-shift}px)`
    case 'right':
      return `translateY(${-shift}px)`
    case 'bottom':
      return `translateX(${-shift}px)`
    default:
      return `translateX(${-shift}px)`
  }
}

const TooltipBalloon = ({classNames, children, position = 'top', shift = 0}) => (
  <div className={cn('TooltipBalloon', {[position]: position}, classNames)}>
    {children}
    <div
      className="TooltipBalloon__arrow"
      style={{
        transform: getTransform(position, shift)
      }}
    />
  </div>
)

TooltipBalloon.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  shift: PropTypes.number
}

export default TooltipBalloon
