import React from 'react'
import PropTypes from 'prop-types'

import propTypes from '../../prop-types'
import LoadingIndicator from '../loading-indicator'
import cn from '../../lib/class-names'

const LoadingContainer = ({classNames, insideContent = false}) => (
  <div className={cn('LoadingContainer', {insideContent}, classNames)}>
    <LoadingIndicator />
  </div>
)

LoadingContainer.propTypes = {
  ...propTypes.component,
  insideContent: PropTypes.bool
}

export default LoadingContainer
