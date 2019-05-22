import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const AppLayout = ({classNames, children, header}) => (
  <div className={cn('AppLayout', {}, classNames)}>
    <div className="AppLayout__header">{header}</div>
    <div className="AppLayout__children">{children}</div>
  </div>
)

AppLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired
}

export default AppLayout
