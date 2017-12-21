import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import LoadingIndicator from './loading-indicator'

const LoadingContainer = ({classNames, modifiers}) => (
  <div className={buildClassName('loading-container', modifiers, classNames)}>
    <LoadingIndicator />
  </div>
)

LoadingContainer.propTypes = {
  ...propTypes.component
}

export default LoadingContainer
