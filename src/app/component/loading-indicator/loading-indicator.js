import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const LoadingIndicator = ({classNames, modifiers}) => (
  <span className={buildClassName('loading-indicator', modifiers, classNames)}>
    <span className="loading-indicator__spinner" />
  </span>
)

LoadingIndicator.propTypes = {
  ...propTypes.component
}

export default LoadingIndicator
