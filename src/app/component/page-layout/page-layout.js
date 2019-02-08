import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const PageLayout = ({classNames, children, header, footer}) => (
  <div className={buildClassName('PageLayout', {}, classNames)}>
    <div className="PageLayout__header">{header}</div>
    <main className="PageLayout__main">{children}</main>
    {footer && <div className="PageLayout__footer">{footer}</div>}
  </div>
)

PageLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  footer: PropTypes.node
}

export default PageLayout