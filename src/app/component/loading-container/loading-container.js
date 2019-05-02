import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import LoadingIndicator from '../loading-indicator'

const LoadingContainer = ({classNames}) => (
  <div className={cn('LoadingContainer', {}, classNames)}>
    <LoadingIndicator />
  </div>
)

LoadingContainer.propTypes = {
  ...propTypes.component
}

export default LoadingContainer
