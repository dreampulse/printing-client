import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const UploadLayout = ({classNames, children, header, stickyFooter, footer}) => (
  <div className={buildClassName('UploadLayout', {}, classNames)}>
    <main className="UploadLayout__main">
      <div className="UploadLayout__header">{header}</div>
      <div className="UploadLayout__content">{children}</div>
      <div className="UploadLayout__stickyFooter">{stickyFooter}</div>
    </main>
    {footer}
  </div>
)

UploadLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  stickyFooter: PropTypes.node.isRequired
}

export default UploadLayout
