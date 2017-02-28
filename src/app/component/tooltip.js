import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

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
