import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const PageLayout = ({
  classNames,
  children,
  footer,
  minorBackground = false,
  stickyFooter = false
}) => (
  <div className={buildClassName('PageLayout', {minorBackground, stickyFooter}, classNames)}>
    <main className="PageLayout__main">
      <div className="PageLayout__content">{children}</div>
      {footer && <div className="PageLayout__footer">{footer}</div>}
    </main>
  </div>
)

PageLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  stickyFooter: PropTypes.bool,
  minorBackground: PropTypes.bool
}

export default PageLayout
