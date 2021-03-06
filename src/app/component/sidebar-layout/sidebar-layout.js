import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const SidebarLayout = ({classNames, children, sidebar}) => (
  <section className={cn('SidebarLayout', {}, classNames)}>
    <div className="SidebarLayout__main">{children}</div>
    <aside className="SidebarLayout__aside">{sidebar}</aside>
  </section>
)

SidebarLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired
}

export default SidebarLayout
