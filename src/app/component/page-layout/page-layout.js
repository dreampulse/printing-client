import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const PageLayout = ({
  classNames,
  children,
  stickyFooter,
  footer,
  minorBackground = false,
  stickyBottom = false
}) => (
  <div className={buildClassName('PageLayout', {minorBackground, stickyBottom}, classNames)}>
    <main className="PageLayout__main">
      <div className="PageLayout__content">
        {children}
        {stickyFooter && <div className="PageLayout__stickyFooter">{stickyFooter}</div>}
      </div>
    </main>
    {footer}
  </div>
)

PageLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  stickyFooter: PropTypes.node,
  minorBackground: PropTypes.bool
}

export default PageLayout
