import PropTypes from 'prop-types'
import React, {useRef} from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const ToolLayout = ({classNames, children, sidebar, fullMain = false, scrollContainerId}) => {
  const asideRef = useRef()

  return (
    <div className={buildClassName('ToolLayout', {fullMain}, classNames)}>
      <main className="ToolLayout__main" id={scrollContainerId}>
        {children}
      </main>
      <aside ref={asideRef} className="ToolLayout__aside">
        {typeof sidebar === 'function' ? sidebar(asideRef.current) : sidebar}
      </aside>
    </div>
  )
}

ToolLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  fullMain: PropTypes.bool,
  scrollContainerId: PropTypes.string
}

export default ToolLayout
