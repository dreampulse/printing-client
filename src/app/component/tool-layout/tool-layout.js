import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const ToolLayout = ({classNames, children, header, sidebar, footer}) => (
  <div className={buildClassName('ToolLayout', {}, classNames)}>
    <div className="ToolLayout__header">{header}</div>
    <main className="ToolLayout__main">{children}</main>
    <aside className="ToolLayout__aside">{sidebar}</aside>
    <div className="ToolLayout__footer">{footer}</div>
  </div>
)

ToolLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired
}

export default ToolLayout
