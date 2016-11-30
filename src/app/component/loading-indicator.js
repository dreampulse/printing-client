import React from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const LoadingIndicator = ({classNames, modifiers}) => (
  <span className={buildClassName('loading-indicator', modifiers, classNames)} />
)

LoadingIndicator.propTypes = {
  ...propTypes.component
}

export default LoadingIndicator
