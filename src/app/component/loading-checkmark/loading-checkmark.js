import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'
import selectedIcon from '../../../asset/icon/selected.svg'

import LoadingIndicator from '../loading-indicator'
import Icon from '../icon'

const LoadingCheckmark = ({classNames, modifiers}) => (
  <span className={buildClassName('loading-checkmark', modifiers, classNames)}>
    <span className="loading-checkmark__loading">
      <LoadingIndicator />
    </span>
    <span className="loading-checkmark__check">
      <Icon source={selectedIcon} />
    </span>
  </span>
)

LoadingCheckmark.propTypes = {
  ...propTypes.component
}

export default LoadingCheckmark
