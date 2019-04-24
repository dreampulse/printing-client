import React from 'react'
import PropTypes from 'prop-types'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const LoadingIndicator = ({classNames, invert = false}) => (
  <span className={cn('LoadingIndicator', {invert}, classNames)}>
    <span className="LoadingIndicator__spinner" />
  </span>
)

LoadingIndicator.propTypes = {
  ...propTypes.component,
  invert: PropTypes.bool
}

export default LoadingIndicator
