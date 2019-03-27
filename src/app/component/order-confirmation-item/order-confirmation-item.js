import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const OrderConfirmationItem = ({
  classNames,
  icon,
  firstLine = null,
  secondLine = null,
  active = false
}) => (
  <div className={cn('OrderConfirmationItem', {active}, classNames)}>
    <div className="OrderConfirmationItem__icon">{icon}</div>
    <div className="OrderConfirmationItem__text">
      <div className="OrderConfirmationItem__firstLine">{firstLine}</div>
      <div className="OrderConfirmationItem__secondLine">{secondLine}</div>
    </div>
  </div>
)

OrderConfirmationItem.propTypes = {
  ...propTypes.component,
  icon: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  active: PropTypes.bool,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string
}

export default OrderConfirmationItem
