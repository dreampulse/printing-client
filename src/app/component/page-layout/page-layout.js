import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const PageLayout = ({
  classNames,
  children,
  header,
  stickyFooter,
  footer,
  showStickyFooter = false,
  minorBackground = false
}) => (
  <div className={buildClassName('PageLayout', {showStickyFooter, minorBackground}, classNames)}>
    <main className="PageLayout__main">
      <div className="PageLayout__header">{header}</div>
      <div className="PageLayout__content">{children}</div>
      {stickyFooter && <div className="PageLayout__stickyFooter">{stickyFooter}</div>}
    </main>
    {footer}
  </div>
)

PageLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  footer: PropTypes.node,
  stickyFooter: PropTypes.node,
  showStickyFooter: PropTypes.bool,
  minorBackground: PropTypes.bool
}

export default PageLayout
