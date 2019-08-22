import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const FeatureListItem = ({classNames, feature, label}) => (
  <li className={cn('FeatureListItem', {}, classNames)}>
    <div className="FeatureListItem__feature">{feature}</div>
    <div className="FeatureListItem__label">{label}</div>
  </li>
)

FeatureListItem.propTypes = {
  ...propTypes.component,
  feature: PropTypes.node.isRequired,
  label: PropTypes.node
}

export default FeatureListItem
