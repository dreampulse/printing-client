import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const Progress = ({classNames, modifiers = [], value, max = 100}) => (
  // The bar needs to be wrapped into a div because we need to set
  // the color property of the <progress> element to currentColor to
  // deactivate the default color in Edge. However, if color: currentColor
  // is set, we cannot just override the color property from the parent
  // component with just a class name.
  <div className={buildClassName('progress', modifiers, classNames)}>
    <progress
      className="progress__bar"
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
