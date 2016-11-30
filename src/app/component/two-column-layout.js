import React, {PropTypes} from 'react'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const TwoColumnLayout = ({classNames, modifiers, children}) => (
  <div className={buildClassName('two-column-layout', modifiers, classNames)}>
    {children}
  </div>
)

TwoColumnLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default TwoColumnLayout
