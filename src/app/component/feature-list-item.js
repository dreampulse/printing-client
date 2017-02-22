import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const FeatureListItem = ({classNames, modifiers, feature, label}) => (
  <li className={buildClassName('feature-list-item', modifiers, classNames)}>
    <div className="feature-list-item__feature">{feature}</div>
    <div className="feature-list-item__label">{label}</div>
  </li>
)

FeatureListItem.propTypes = {
  ...propTypes.component,
  feature: PropTypes.node.isRequired,
  label: PropTypes.node
}

export default FeatureListItem
