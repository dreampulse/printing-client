import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

const SidebarLayout = ({classNames, modifiers, children, sidebar}) => (
  <section className={buildClassName('sidebar-layout', modifiers, classNames)}>
    <div>{children}</div>
    <div>
      <aside className="sidebar-layout__aside">{sidebar}</aside>
    </div>
  </section>
)

SidebarLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired
}

export default SidebarLayout
