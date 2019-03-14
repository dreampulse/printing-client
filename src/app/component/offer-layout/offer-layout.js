import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferLayout = ({classNames, children, footer}) => (
  <div className={buildClassName('OfferLayout', {}, classNames)}>
    <div className="OfferLayout__main">{children}</div>
    <div className="OfferLayout__footer">{footer}</div>
  </div>
)

OfferLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired
}

export default OfferLayout
