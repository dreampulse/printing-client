import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const FeatureList = ({classNames, modifiers, children}) => (
  <ul className={buildClassName('feature-list', modifiers, classNames)}>
    {children}
  </ul>
)

FeatureList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node
}

export default FeatureList
