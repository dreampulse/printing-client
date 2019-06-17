import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const OfferItem = ({classNames, children, actions}) => (
  <div className={buildClassName('OfferItem', {}, classNames)}>
    <div className="OfferItem__main">{children}</div>
    <div className="OfferItem__actions">{actions}</div>
  </div>
)

OfferItem.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired
}

export default OfferItem
