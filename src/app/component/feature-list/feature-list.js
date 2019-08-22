import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const FeatureList = ({classNames, children}) => (
  <ul className={cn('FeatureList', {}, classNames)}>{children}</ul>
)

FeatureList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node
}

export default FeatureList
