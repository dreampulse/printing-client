import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Tooltip = ({classNames, modifiers, children}) => (
  <div className={buildClassName('tooltip', modifiers, classNames)}>
    {children}
  </div>
)

Tooltip.propTypes = {
  ...propTypes.component,
  children: PropTypes.node
}

export default Tooltip
