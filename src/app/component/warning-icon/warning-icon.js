import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import warningIcon from '../../../asset/icon/warning.svg'

const WarningIcon = ({classNames, modifiers = []}) => (
  <span className={buildClassName('warning-icon', modifiers, classNames)}>
    <Icon source={warningIcon} />
  </span>
)

WarningIcon.propTypes = {
  ...propTypes.component
}

export default WarningIcon
