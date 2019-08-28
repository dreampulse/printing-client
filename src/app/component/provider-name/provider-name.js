import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import {getProviderName} from '../../lib/material'

const ProviderName = ({classNames, vendorId}) => (
  <span className={cn('ProviderName', {}, classNames)}>{getProviderName(vendorId)}</span>
)

ProviderName.propTypes = {
  ...propTypes.component,
  vendorId: PropTypes.string.isRequired
}

export default ProviderName
