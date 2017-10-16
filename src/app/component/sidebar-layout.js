import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const SidebarLayout = ({classNames, modifiers, children, sidebar}) => (
  <section className={buildClassName('sidebar-layout', modifiers, classNames)}>
    <div className="sidebar-layout__main">
      {children}
    </div>
    <aside className="sidebar-layout__aside">
      {sidebar}
    </aside>
  </section>
)

SidebarLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired
}

export default SidebarLayout
