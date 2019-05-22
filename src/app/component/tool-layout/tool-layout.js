import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const ToolLayout = ({classNames, children, sidebar, fullMain = false, scrollContainerId}) => (
  <div className={buildClassName('ToolLayout', {fullMain}, classNames)}>
    <main className="ToolLayout__main" id={scrollContainerId}>
      {children}
    </main>
    <aside className="ToolLayout__aside">{sidebar}</aside>
  </div>
)

ToolLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node.isRequired,
  fullMain: PropTypes.bool,
  scrollContainerId: PropTypes.string
}

export default ToolLayout
