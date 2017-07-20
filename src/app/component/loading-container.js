import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'
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
