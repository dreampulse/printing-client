import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const LoadingIndicator = ({classNames, modifiers}) => (
  <span className={buildClassName('loading-indicator', modifiers, classNames)}>
    <span className="loading-indicator__spinner" />
  </span>
)

LoadingIndicator.propTypes = {
  ...propTypes.component
}

export default LoadingIndicator
