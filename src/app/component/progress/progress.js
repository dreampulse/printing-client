import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Progress = ({classNames, value, max = 100}) => (
  // The bar needs to be wrapped into a div because we need to set
  // the color property of the <progress> element to currentColor to
  // deactivate the default color in Edge. However, if color: currentColor
  // is set, we cannot just override the color property from the parent
  // component with just a class name.
  <div className={cn('Progress', {}, classNames)}>
    <progress
      className="Progress__bar"
      value={value}
      max={max}
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
    />
  </div>
)

Progress.propTypes = {
  ...propTypes.component,
  value: PropTypes.number.isRequired,
  max: PropTypes.number
}

export default Progress
