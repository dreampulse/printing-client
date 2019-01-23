import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const ToolLayout = ({classNames, children, header, sidebar}) => (
  <div className={buildClassName('ToolLayout', {}, classNames)}>
    <div className="ToolLayout__header">{header}</div>
    <main className="ToolLayout__main">{children}</main>
    <aside className="ToolLayout__aside">{sidebar}</aside>
  </div>
)

ToolLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired
}

export default ToolLayout
